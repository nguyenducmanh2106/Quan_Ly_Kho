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
using Newtonsoft.Json;
using Application.Services.DM_NhaCungCapSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/dm_nhacungcap")]
    public class DM_NhaCungCapController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IDM_NhaCungCapServices _manager;

        public DM_NhaCungCapController(IConfiguration config, IDM_NhaCungCapServices _manager)
        {
            _config = config;
            this._manager = _manager;
        }
        [HttpGet("list_data")]
        public async Task<IActionResult> ListData(int page = 1, int pageSize = 10, int Status = -1, string Name = "", string Phone = "", string nameSort = "")
        {
            try
            {
                var totalPage = 0;
                var total = 0;
                var stt = (page - 1) * pageSize;
                var dataExist = await _manager.getData(page, pageSize, Status, Name, Phone);
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
                                dataExist = dataExist.OrderBy(g => g.Name);
                                break;
                            case "Name_desc":
                                dataExist = dataExist.OrderByDescending(g => g.Name);
                                break;
                            case "Code_asc":
                                dataExist = dataExist.OrderBy(g => g.Code);
                                break;
                            case "Code_desc":
                                dataExist = dataExist.OrderByDescending(g => g.Code);
                                break;
                            default:
                                dataExist = dataExist.OrderByDescending(g => g.Created_At);
                                break;
                        }
                    }
                    total = dataExist.Count();
                    var data = dataExist.Skip((page - 1) * pageSize).Take(pageSize);
                    totalPage = (int)Math.Ceiling(((double)total / pageSize));
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = new
                        {
                            data,
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
        [HttpGet("get-all-data-active")]
        public async Task<IActionResult> GetAllDataActive()
        {
            try
            {
                var data = await _manager.GetAllDataActive();
                MessageSuccess success = new MessageSuccess()
                {
                    result = data
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] DM_NhaCungCaps obj)
        {
            try
            {
                var objAdd = new DM_NhaCungCaps()
                {
                    Name = obj.Name,
                    Phone = obj.Phone,
                    Status = obj.Status,
                    Code = obj.Code,
                    Email = obj.Email,
                    Address = obj.Address,
                    MaSoThue = obj.MaSoThue,
                    TenNguoiDaiDien = obj.TenNguoiDaiDien,
                    SDTNguoiDaiDien = obj.SDTNguoiDaiDien,
                    DiaChiNguoiDaiDien = obj.DiaChiNguoiDaiDien,
                    TenNganHang = obj.TenNganHang,
                    ChiNhanhNH = obj.ChiNhanhNH,
                    STKNganHang = obj.STKNganHang,
                    TenChuTKNganHang = obj.TenChuTKNganHang,
                    GhiChu = obj.GhiChu,
                    Created_At = DateTime.Now.Date
                };
                await _manager.Create(objAdd);
                MessageSuccess success = new MessageSuccess()
                {
                    message = MessageConst.CREATE_SUCCESS
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.CREATE_FAIL
                });
            }
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] DM_NhaCungCaps obj)
        {
            try
            {

                await _manager.Update(obj);
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
        public async Task<IActionResult> Delete([FromBody] DM_NhaCungCaps obj)
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
        [HttpPost("find-by-attributes")]
        public async Task<IActionResult> FindByAttributes([FromBody] DM_NhaCungCaps obj)
        {
            try
            {
                var data = await _manager.FindByAttributes(obj);
                MessageSuccess success = new MessageSuccess()
                {
                    result = data
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.CREATE_FAIL
                });
            }
        }
        [HttpGet("find-by-id")]
        public async Task<IActionResult> FindById(int id)
        {
            try
            {
                var data = await _manager.FindById(id);
                MessageSuccess success = new MessageSuccess()
                {
                    result = data
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.CREATE_FAIL
                });
            }
        }
    }
}
