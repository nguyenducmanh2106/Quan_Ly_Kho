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
using Application.Services.PermissionSerVices;
using Newtonsoft.Json;

namespace Application.API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/permission")]
    public class PermissionController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IPermissionServices _manager;

        public PermissionController(IConfiguration config, IPermissionServices _manager)
        {
            _config = config;
            this._manager = _manager;
        }
        [HttpGet("data-permission")]
        public async Task<IActionResult> DataPermission(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0)
        {
            try
            {

                var result = await _manager.DataPermission(permissId, usergroupId, code, langId);
                MessageSuccess success = new MessageSuccess()
                {
                    result = result
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError());
            }
        }
        [HttpGet("data-permission-trai-phang")]
        public async Task<IActionResult> DataPermissionTraiPhang(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0)
        {
            try
            {

                var result = await _manager.TraiPhangPermission(permissId, usergroupId, code, langId);
                MessageSuccess success = new MessageSuccess()
                {
                    result = result
                };
                return Ok(success);
            }
            catch (Exception ex)
            {
                return Ok(new MessageError());
            }
        }
        [HttpGet("list_data")]
        public async Task<IActionResult> ListData(int page = 1, int pageSize = 10, int Status = -1, string Name = "",string nameSort="")
        {
            try
            {
                var totalPage = 0;
                var total = 0;
                var stt = (page - 1) * pageSize;
                var dataExist = await _manager.getData(page, pageSize, Status, Name);
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
                            case "Ordering_asc":
                                dataExist = dataExist.OrderBy(g => g.Ordering);
                                break;
                            case "Ordering_desc":
                                dataExist = dataExist.OrderByDescending(g => g.Ordering);
                                break;
                            default:
                                dataExist = dataExist.OrderBy(g => g.Ordering);
                                break;
                        }
                    }
                    //List<Permissions> list = Common.CreateLevel(dataExist.ToList(), "ParentId");
                    //list=list.Select(g => new Permissions()
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
        public async Task<IActionResult> Create([FromBody] Permissions obj)
        {
            try
            {
                var objAdd = new Permissions()
                {
                    Name = obj.Name,
                    Status = obj.Status,
                    Code=obj.Code,
                    MenuId = obj.MenuId,
                    Ordering = obj.Ordering,
                    Description=obj.Description
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
        public async Task<IActionResult> Update([FromBody] Permissions obj)
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
        public async Task<IActionResult> ToggleStatus([FromBody] Permissions obj)
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
        public async Task<IActionResult> Delete([FromBody] Permissions obj)
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
    }
}
