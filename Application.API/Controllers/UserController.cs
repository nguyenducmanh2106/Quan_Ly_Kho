using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.MODELS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Application.UTILS;
using Application.Services.UserServices;
using Application.Utils;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using DSDLHD.Utils;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _manager;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(IConfiguration config, IUserServices _manager, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            this._manager = _manager;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Authentication([FromBody] Users login)
        {
            try
            {
                var response = Unauthorized();
                Users user = await _manager.Login(login.UserName, login.PassWord);
                var tokenString = GenerateJWTToken(user);
                MessageSuccess success = new MessageSuccess()
                {
                    result = new
                    {
                        access_token = tokenString,
                        userDetails = user,
                    }
                };
                return Ok(success);

            }
            catch (Exception ex)
            {
                MessageError error = new MessageError()
                {
                    message = ex.Message.ToString()
                };
                return Ok(error);
            }
        }
        [HttpGet("list_data")]
        public async Task<IActionResult> ListData(int page = 1, int pageSize = 4, int Status = -1, string Name = "", int ChucVuId = -1, string nameSort = "")
        {
            try
            {
                var totalPage = 0;
                var total = 0;
                var stt = (page - 1) * pageSize;
                var dataExist = (await _manager.getData(page, pageSize, Status, Name, ChucVuId));
                
                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {
                    if (!string.IsNullOrEmpty(nameSort))
                    {
                        switch (nameSort)
                        {
                            case "Name_asc":
                                dataExist = dataExist.OrderBy(g => g.FullName);
                                break;
                            case "Name_desc":
                                dataExist = dataExist.OrderByDescending(g => g.FullName);
                                break;

                            default:
                                dataExist = dataExist.OrderBy(g => g.Ordering);
                                break;
                        }
                    }
                    total = dataExist.Count();
                    var data = dataExist.Skip((page - 1) * pageSize).Take(pageSize).ToList();
                    var dataFinal = data.Select(g => new Users()
                    {
                        Id = g.Id,
                        FullName = g.FullName,
                        UserName = g.UserName,
                        pathAvatar = ReadFileToBase64(g.pathAvatar),
                        Email = g.Email,
                        PhoneNumber = g.PhoneNumber,
                        UserGroupID = g.UserGroupID,
                        DonViId = g.DonViId,
                        ChucVuId = g.ChucVuId,
                        Permission = g.Permission,
                        isRoot = g.isRoot,
                        isThongKe = g.isThongKe,
                        Status=g.Status,
                        PassWord = g.PassWord,
                        Avatar=g.Avatar
                    });
                    totalPage = (int)Math.Ceiling(((double)total / pageSize));
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = new
                        {
                            data= dataFinal,
                            totalPage,
                            total,
                            stt,
                            page,
                            pageSize
                        }
                    };
                    return Ok(success);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Users obj)
        {
            try
            {
                string host = this._hostingEnvironment.WebRootPath;
                Guid randomString = System.Guid.NewGuid();
                string filename = randomString + obj.Avatar;
                if (!string.IsNullOrEmpty(obj.File_Base64))
                {
                    var urlFile = GetPathAndFilename(filename);
                    ConvertBase64.Base64ToFile(obj.File_Base64, urlFile, filename);
                    obj.pathAvatar = urlFile.Replace(host, "");
                }
                await _manager.Create(obj);
                return Ok(new MessageSuccess()
                {
                    message = MessageConst.CREATE_SUCCESS
                });
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.CREATE_FAIL
                });
            }
        }
        public dynamic ReadFileToBase64(string filename)
        {
            string host = this._hostingEnvironment.WebRootPath;
            string folderFile = $"{host}/{filename}";
            string result = "";
            if (!string.IsNullOrEmpty(filename) && System.IO.File.Exists(folderFile))
            {
                byte[] bytes = System.IO.File.ReadAllBytes(folderFile);
                result = Convert.ToBase64String(bytes);
            }
            return result;
        }
        private string GetPathAndFilename(string filename)
        {
            // Tạo folder lưu file theo ngày 
            //_config["ChungTaiLieuDuLich"] được khai báo trong appsetting
            // Nếu chưa có folder thì tạo mới
            // Trả về đường dẫn của file

            string currentDate = DateTime.Now.Date.ToString("ddMMyyyy");
            var folder = $"{this._hostingEnvironment.WebRootPath}/{_config["Avatar"].ToString()}/{currentDate}";
            var filePath = $"{folder}/{filename}";
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return filePath;
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] Users obj)
        {
            try
            {
                var existData =await _manager.FindById(obj.Id);
                if (existData == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                string host = this._hostingEnvironment.WebRootPath;
                Guid randomString = System.Guid.NewGuid();
                string filename = randomString + obj.Avatar;
                if (!string.IsNullOrEmpty(obj.File_Base64)&& ReadFileToBase64(existData.pathAvatar)==obj.File_Base64)
                {
                    var urlFile = GetPathAndFilename(filename);
                    ConvertBase64.Base64ToFile(obj.File_Base64, urlFile, filename);
                    obj.pathAvatar = urlFile.Replace(host, "");
                }
                await _manager.Update(obj);
                return Ok(new MessageSuccess()
                {
                    message = MessageConst.UPDATE_SUCCESS
                });
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.UPDATE_FAIL
                });
            }
        }
        [HttpPost("changepass-user")]
        public async Task<IActionResult> ChangePassUser([FromBody] Users obj)
        {
            try
            {
                await _manager.ChangePassUser(obj);
                return Ok(new MessageSuccess()
                {
                    message = MessageConst.CHANGEPASSWORD_SUCCESS
                });
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.CHANGEPASSWORD_FAIL
                });
            }
        }
        [HttpPost("toggle-status")]
        public async Task<IActionResult> ToggleStatus([FromBody] Users obj)
        {
            try
            {

                await _manager.ToggleStatus(obj);
                MessageSuccess success = new MessageSuccess()
                {
                    message = MessageConst.UPDATE_SUCCESS
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.UPDATE_FAIL
                });
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] Users obj)
        {
            try
            {

                await _manager.Delete(obj);
                MessageSuccess success = new MessageSuccess()
                {
                    message = MessageConst.DELETE_SUCCESS
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.DELETE_FAIL
                });
            }
        }
        [HttpPost("multidelete")]
        public async Task<IActionResult> MultiDelete([FromForm] string lstid)
        {
            try
            {
                await _manager.MultiDelete(lstid);
                MessageSuccess success = new MessageSuccess()
                {
                    message = MessageConst.DELETE_SUCCESS
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.DELETE_FAIL
                });
            }

        }

        string GenerateJWTToken(Users userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("FullName", userInfo.FullName.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
