using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MODELS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Application.UTILS;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Application.API.Middleware;
using Newtonsoft.Json;
using Application.MODELS.ViewModels;
using Application.Services.DM_KiemKeSerVices;
using Application.Services.DM_ChiTietKiemKeSerVices;
using Application.Services.UserServices;
using Application.Services.ChiTietKhoSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/dm_kiemke")]
    public class DM_KiemKeController : ControllerBase
    {
        private readonly IDM_KiemKeServices _manager;
        private readonly IDM_ChiTietKiemKeServices _managerChiTiet;
        private readonly IUserServices _managerUser;
        private readonly IChiTietKhoServices _managerChiTietKho;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DM_KiemKeController(IConfiguration config, IChiTietKhoServices _managerChiTietKho, IUserServices _managerUser, IDM_ChiTietKiemKeServices _managerChiTiet, IDM_KiemKeServices _manager, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            this._manager = _manager;
            this._managerChiTiet = _managerChiTiet;
            this._managerUser = _managerUser;
            this._managerChiTietKho = _managerChiTietKho;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("list_data")]
        public async Task<IActionResult> ListData(DM_KiemKeFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getData(inputModel));
                var result = dataExist.Select(g => new DM_KiemKes()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Status = g.Status,
                    Id_ChiNhanh = g.Id_ChiNhanh,
                    NhanVienKiem = g.NhanVienKiem,
                    NgayKiem = g.NgayKiem,
                    NhanVienCanBang = g.NhanVienCanBang,
                    NgayCanBang = g.NgayCanBang,
                    NgayHoanThanh = g.NgayHoanThanh,
                    GhiChu = g.GhiChu,
                    tenChiNhanh = g.tenChiNhanh,
                    tenNguoiCanBang = g.tenNguoiCanBang,
                    tenNguoiKiem = g.tenNguoiKiem,
                    tenNguoiTao = g.tenNguoiTao,
                    ChiTietKiemKes = _managerChiTiet.GetAllDataByID_KiemKe(g.Code)
                }).ToList();
                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {

                    total = (await _manager.ToTalCount(inputModel));
                    totalPage = (int)Math.Ceiling(((double)total / inputModel.pageSize));
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = new
                        {
                            data = result,
                            totalPage,
                            total,
                            stt,
                            page = inputModel.page,
                            pageSize = inputModel.pageSize
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
        [HttpGet("find-by-id")]
        public async Task<IActionResult> FindById(string Code = "")
        {
            try
            {
                var g = await _manager.FindById(Code);
                var result = new DM_KiemKes()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Status = g.Status,
                    Id_ChiNhanh = g.Id_ChiNhanh,
                    NhanVienKiem = g.NhanVienKiem,
                    NgayKiem = g.NgayKiem,
                    NhanVienCanBang = g.NhanVienCanBang,
                    NgayCanBang = g.NgayCanBang,
                    NgayHoanThanh = g.NgayHoanThanh,
                    GhiChu = g.GhiChu,
                    tenChiNhanh = g.tenChiNhanh,
                    tenNguoiCanBang = g.tenNguoiCanBang,
                    tenNguoiKiem = g.tenNguoiKiem,
                    tenNguoiTao = g.tenNguoiTao,
                    ChiTietKiemKes = _managerChiTiet.GetAllDataByID_KiemKe(g.Code)
                };
                MessageSuccess success = new MessageSuccess()
                {
                    result = result
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
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] DM_KiemKes obj)
        {
            try
            {
                var data = await _manager.Create(obj);
                if (obj.ChiTietKiemKes.Count > 0)
                {
                    foreach (var item in obj.ChiTietKiemKes)
                    {
                        item.Id = 0;
                        item.ID_KiemKe = data.Code;
                    }
                    await _managerChiTiet.TaoPhieu(obj.ChiTietKiemKes);
                }
                return Ok(new MessageSuccess()
                {
                    message = MessageConst.CREATE_SUCCESS,
                    result = data.Code
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
        [HttpPost("kiemhang")]
        public async Task<IActionResult> KiemHang([FromBody] DM_KiemKes obj)
        {
            try
            {
                await _managerChiTiet.KiemHang(obj.ChiTietKiemKes);
                obj.Status = (int)KiemKeStatus.KiemHang;
                await _manager.KiemHang(obj);
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
        [HttpPost("dangkiemhang")]
        public async Task<IActionResult> DangKiemHang([FromBody] DM_KiemKes obj)
        {
            try
            {
                obj.Status = (int)KiemKeStatus.DangKiem;
                await _manager.DangKiemHang(obj);
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
        [HttpPost("hoanthanh")]
        public async Task<IActionResult> HoanThanh([FromBody] DM_KiemKes obj)
        {
            try
            {
                await _managerChiTietKho.CanBangKho(obj.ChiTietKho);
                obj.Status = (int)KiemKeStatus.HoanThanh;
                await _manager.HoanThanh(obj);
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

        [HttpPost("canbang")]
        public async Task<IActionResult> CanBang([FromBody] DM_KiemKes obj)
        {
            try
            {
                obj.Status = (int)KiemKeStatus.CanBang;
                await _manager.CanBang(obj);
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
        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] DM_KiemKes obj)
        {
            try
            {

                var data = await _manager.Delete(obj);
                await _managerChiTiet.DeleteByID_KiemKe(data.Code);
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
                await _managerChiTiet.BulkDeleteByID_KiemKe(lstid);
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
    }
}
