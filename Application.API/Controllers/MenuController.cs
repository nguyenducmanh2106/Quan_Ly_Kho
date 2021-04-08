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
using Application.Services.MenuSerVices;
using Newtonsoft.Json;
using Application.API.Middleware;

namespace Application.API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/menu")]
    public class MenuController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMenuServices _manager;

        public MenuController(IConfiguration config, IMenuServices _manager)
        {
            _config = config;
            this._manager = _manager;
        }
        [HttpGet("get-options")]
        public async Task<IActionResult> GetOptions(int Status = -1, string Name = "")
        {
            try
            {
                var dataExist = await _manager.GetOptions(Status, Name);
                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {
                    List<Menus> data = Common.CreateLevel(dataExist.OrderBy(g => g.Ordering).ToList(), "ParentId");
                    data = data.Select(g => new Menus()
                    {
                        Id = g.Id,
                        Name = Common.setName(g.Level, g.Name),
                        Ordering = g.Ordering,
                        ParentId = g.ParentId,
                        Status = g.Status,
                        Url = g.Url,
                        Level = g.Level,
                        icon=g.icon,
                        isMenu = g.isMenu
                    }).ToList();
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = data
                    };
                    return Ok(success);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [RoleAuthorizeAttribute("Category.View")]
        [HttpGet("list_data")]
        public async Task<IActionResult> ListData(int page = 1, int pageSize = 4, int Status = -1, string Name = "",string nameSort="")
        {
            try
            {
                var totalPage = 0;
                var total = 0;
                var stt = (page - 1) * pageSize;
                var dataExist = await _manager.getData(page, pageSize, Status, Name,nameSort);
               
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
                            case "Ordering_asc":
                                dataExist = dataExist.OrderBy(g => g.Ordering);
                                break;
                            case "Ordering_desc":
                                dataExist = dataExist.OrderByDescending(g => g.Ordering);
                                break;
                            default:
                                dataExist = dataExist.OrderByDescending(g => g.Created_At);
                                break;
                        }
                    }
                    //List<Menus> list = Common.CreateLevel(dataExist.ToList(), "ParentId");
                    //list=list.Select(g => new Menus()
                    //{
                    //    Id = g.Id,
                    //    Name = Common.setName(g.Level,g.Name),
                    //    Ordering = g.Ordering,
                    //    ParentId = g.ParentId,
                    //    Status = g.Status,
                    //    Url = g.Url,
                    //    Level = g.Level,
                    //    isMenu = g.isMenu
                    //}).ToList();
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
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Menus obj)
        {
            try
            {
                var objAdd = new Menus()
                {
                    ParentId = obj.ParentId,
                    Name = obj.Name,
                    Status = obj.Status,
                    icon=obj.icon,
                    isMenu = obj.isMenu,
                    Url = obj.Url,
                    Ordering = obj.Ordering,
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
        public async Task<IActionResult> Update([FromBody] Menus obj)
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
        [HttpPost("toggle-status")]
        public async Task<IActionResult> ToggleStatus([FromBody] Menus obj)
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
        public async Task<IActionResult> Delete([FromBody] Menus obj)
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
            catch(Exception ex)
            {
                return Ok(new MessageError()
                {
                    message = MessageConst.DELETE_FAIL
                });
            }

        }
        [HttpGet("raw_menu")]
        public async Task<IActionResult> RawMenu()
        {
            try
            {
                var rawMenu = await _manager.GetChild(0);
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = rawMenu
                    };
                    return Ok(success);
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet("get-breadcumb")]
        public async Task<IActionResult> GetBreadCumb(string url)
        {
            try
            {
                var data = await _manager.GetBreadCumb(url);
                if (data != null)
                {
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = data
                    };
                    return Ok(success);
                }
                else
                {
                    return Ok(new MessageError());
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
