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
using Application.Services.DM_ChiTietXuatHangSerVices;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Application.API.Middleware;
using Newtonsoft.Json;
using Application.MODELS.ViewModels;
using Application.Services.DM_XuatHangSerVices;
using Application.Services.UserServices;
using Application.Services.ThanhToanDonHangSerVices;
using Application.Services.ChiTietKhoSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/dm_xuathang")]
    public class DM_XuatHangController : ControllerBase
    {
        private readonly IDM_XuatHangServices _manager;
        private readonly IDM_ChiTietXuatHangServices _managerChiTiet;
        private readonly IThanhToanDonHangServices _managerThanhToan;
        private readonly IUserServices _managerUser;
        private readonly IChiTietKhoServices _managerChiTietKho;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DM_XuatHangController(IConfiguration config, IChiTietKhoServices _managerChiTietKho, IThanhToanDonHangServices _managerThanhToan, IUserServices _managerUser, IDM_ChiTietXuatHangServices _managerChiTiet, IDM_XuatHangServices _manager, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            this._manager = _manager;
            this._managerChiTiet = _managerChiTiet;
            this._managerUser = _managerUser;
            this._managerChiTietKho = _managerChiTietKho;
            this._managerThanhToan = _managerThanhToan;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("list_data")]
        public async Task<IActionResult> ListData(DM_XuatHangFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getData(inputModel));
                var result = dataExist.Select(g => new DM_XuatHangs()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Updated_At = g.Updated_At,
                    Updated_By = g.Updated_By,
                    NgayDuyet = g.NgayDuyet,
                    TaiKhoanDuyet = g.TaiKhoanDuyet,
                    TongSoLuong = g.TongSoLuong,
                    TongTien = g.TongTien,
                    TongTienPhaiTra = g.TongTienPhaiTra,
                    Status = g.Status,
                    ChietKhau = g.ChietKhau,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    NgayHenGiao = g.NgayHenGiao,
                    NgayXuatKho = g.NgayXuatKho,
                    NgayHuyDon = g.NgayHuyDon,
                    NgayHoanThanh = g.NgayHoanThanh,
                    ID_NhaCungCap = g.ID_NhaCungCap,
                    Description = g.Description,
                    LoaiXuatHang = g.LoaiXuatHang,
                    KhachHang = g.KhachHang,
                    SdtKhachHang = g.SdtKhachHang,
                    tenNhaCungCap = g.tenNhaCungCap,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenNguoiTao = g.tenNguoiTao,
                    ChiTietXuatHangs = _managerChiTiet.GetAllDataByID_XuatHang(g.Code)
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
                var result = new DM_XuatHangs()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Updated_At = g.Updated_At,
                    Updated_By = g.Updated_By,
                    NgayDuyet = g.NgayDuyet,
                    TaiKhoanDuyet = g.TaiKhoanDuyet,
                    TongSoLuong = g.TongSoLuong,
                    TongTien = g.TongTien,
                    TongTienPhaiTra = g.TongTienPhaiTra,
                    Status = g.Status,
                    ChietKhau = g.ChietKhau,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    NgayHenGiao = g.NgayHenGiao,
                    NgayXuatKho = g.NgayXuatKho,
                    NgayHuyDon = g.NgayHuyDon,
                    NgayHoanThanh = g.NgayHoanThanh,
                    ID_NhaCungCap = g.ID_NhaCungCap,
                    Description = g.Description,
                    LoaiXuatHang = g.LoaiXuatHang,
                    KhachHang = g.KhachHang,
                    SdtKhachHang = g.SdtKhachHang,
                    tenNhaCungCap = g.tenNhaCungCap,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenNguoiTao = g.tenNguoiTao,
                    ChiTietXuatHangs = _managerChiTiet.GetAllDataByID_XuatHang(g.Code)
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
        public async Task<IActionResult> Create([FromBody] DM_XuatHangs obj)
        {
            try
            {
                var data = await _manager.Create(obj);
                if (obj.ChiTietXuatHangs.Count > 0)
                {
                    foreach (var item in obj.ChiTietXuatHangs)
                    {
                        item.Id = 0;
                        item.ID_DM_XuatHang = data.Code;
                    }
                    await _managerChiTiet.BulkInsert(obj.ChiTietXuatHangs);
                }
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
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] DM_XuatHangs obj)
        {
            try
            {
                await _manager.Update(obj);
                if (obj.ChiTietXuatHangs.Count > 0)
                {
                    foreach (var item in obj.ChiTietXuatHangs)
                    {
                        item.ID_DM_XuatHang = obj.Code;
                        item.Id = 0;
                    }
                    await _managerChiTiet.BulkInsert(obj.ChiTietXuatHangs);
                }

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
        [HttpPost("pheduyet")]
        public async Task<IActionResult> PheDuyet([FromBody] DM_XuatHangs obj)
        {
            try
            {
                obj.Status = (int)DatHangStatus.Duyet;
                await _manager.PheDuyet(obj);
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
        public async Task<IActionResult> HoanThanh([FromBody] DM_XuatHangs obj)
        {
            try
            {
                obj.Status = (int)DatHangStatus.HoanThanh;
                await _manager.HoanThanh(obj);
                await _managerChiTietKho.CreateOrUpdate(obj.ChiTietKho);
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
        [HttpPost("huydon")]
        public async Task<IActionResult> HuyDon([FromBody] DM_XuatHangs obj)
        {
            try
            {
                obj.Status = (int)DatHangStatus.HuyDon;
                await _manager.TuChoi(obj);
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
        [HttpPost("xuatkho")]
        public async Task<IActionResult> XuatHang([FromBody] DM_XuatHangs obj)
        {
            try
            {
                obj.Status = (int)DatHangStatus.NhapKho;
                await _manager.XuatHang(obj);
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
        public async Task<IActionResult> Delete([FromBody] DM_XuatHangs obj)
        {
            try
            {

                var data = await _manager.Delete(obj);
                await _managerChiTiet.DeleteByID_XuatHang(data.Code);
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
        [HttpPost("toggle-status")]
        public async Task<IActionResult> ToggleStatus([FromBody] DM_XuatHangs obj)
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
        [HttpPost("multidelete")]
        public async Task<IActionResult> MultiDelete([FromForm] string lstid)
        {
            try
            {
                await _manager.MultiDelete(lstid);
                await _managerChiTiet.BulkDeleteByID_XuatHang(lstid);
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
