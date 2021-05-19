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
using Application.Services.DM_ChiTietNhapHangSerVices;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Application.API.Middleware;
using Newtonsoft.Json;
using Application.MODELS.ViewModels;
using Application.Services.DM_NhapHangSerVices;
using Application.Services.UserServices;
using Application.Services.ThanhToanDonHangSerVices;
using Application.Services.ChiTietKhoSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/dm_nhaphang")]
    public class DM_NhapHangController : ControllerBase
    {
        private readonly IDM_NhapHangServices _manager;
        private readonly IDM_ChiTietNhapHangServices _managerChiTiet;
        private readonly IThanhToanDonHangServices _managerThanhToan;
        private readonly IUserServices _managerUser;
        private readonly IChiTietKhoServices _managerChiTietKho;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DM_NhapHangController(IConfiguration config, IChiTietKhoServices _managerChiTietKho, IThanhToanDonHangServices _managerThanhToan, IUserServices _managerUser, IDM_ChiTietNhapHangServices _managerChiTiet, IDM_NhapHangServices _manager, IHostingEnvironment hostingEnvironment)
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
        public async Task<IActionResult> ListData(DM_NhapHangFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getData(inputModel));
                var result = dataExist.Select(g => new DM_NhapHangs()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Updated_At = g.Updated_At,
                    Updated_By = g.Updated_By,
                    NgayDuyet = g.NgayDuyet,
                    TaiKhoanDuyet = g.TaiKhoanDuyet,
                    Status = g.Status,
                    ThanhToan = g.ThanhToan,
                    NhapKho = g.NhapKho,
                    TongSoLuong = g.TongSoLuong,
                    TongTien = g.TongTien,
                    TongTienPhaiTra = g.TongTienPhaiTra,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    NgayHenGiao = g.NgayHenGiao,
                    NgayNhapKho = g.NgayNhapKho,
                    ID_NhaCungCap = g.ID_NhaCungCap,
                    Description = g.Description,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenNhaCungCap = g.tenNhaCungCap,
                    tenNguoiTao = g.tenNguoiTao,
                    ChiTietNhapHangs = _managerChiTiet.GetAllDataByID_NhapHang(g.Code, g.ID_ChiNhanhNhan ?? 0)
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
        public async Task<IActionResult> FindById(string Code = "", int Id_Kho = -1)
        {
            try
            {
                var g = await _manager.FindById(Code);
                var result = new DM_NhapHangs()
                {
                    Id = g.Id,
                    Code = g.Code,
                    Created_At = g.Created_At,
                    Created_By = g.Created_By,
                    Updated_At = g.Updated_At,
                    Updated_By = g.Updated_By,
                    NgayDuyet = g.NgayDuyet,
                    TaiKhoanDuyet = g.TaiKhoanDuyet,
                    Status = g.Status,
                    nhaCungCaps = g.nhaCungCaps,
                    ChietKhau = g.ChietKhau,
                    TongTienPhaiTra = g.TongTienPhaiTra,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    NgayHenGiao = g.NgayHenGiao,
                    NgayNhapKho = g.NgayNhapKho,
                    NgayHoanThanh = g.NgayHoanThanh,
                    TongSoLuong = g.TongSoLuong,
                    TongTien = g.TongTien,
                    NgayHuyDon = g.NgayHuyDon,
                    ID_NhaCungCap = g.ID_NhaCungCap,
                    Description = g.Description,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenNhaCungCap = g.tenNhaCungCap,
                    tenNguoiTao = g.tenNguoiTao,
                    TongDaThanhToan = _managerThanhToan.TongDaThanhToan(g.Code),
                    ThanhToanDonHangs = _managerThanhToan.GetAllDataActiveByID_NhapHang(g.Code),
                    ChiTietNhapHangs = _managerChiTiet.GetAllDataByID_NhapHang(g.Code, Id_Kho)
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
        public async Task<IActionResult> Create([FromBody] DM_NhapHangs obj)
        {
            try
            {
                var data = await _manager.Create(obj);
                if (obj.ChiTietNhapHangs.Count > 0)
                {
                    foreach (var item in obj.ChiTietNhapHangs)
                    {
                        item.Id = 0;
                        item.ID_DM_NhapHang = data.Code;
                    }
                    await _managerChiTiet.BulkInsert(obj.ChiTietNhapHangs);
                }
                if (obj.ThanhToanDonHang.TongTienDaTra > 0)
                {
                    obj.ThanhToanDonHang.ID_NhapHang = data.Code;
                    await _managerThanhToan.Create(obj.ThanhToanDonHang);
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
        public async Task<IActionResult> Update([FromBody] DM_NhapHangs obj)
        {
            try
            {
                await _manager.Update(obj);
                if (obj.ChiTietNhapHangs.Count > 0)
                {
                    foreach (var item in obj.ChiTietNhapHangs)
                    {
                        item.ID_DM_NhapHang = obj.Code;
                        item.Id = 0;
                    }
                    await _managerChiTiet.BulkInsert(obj.ChiTietNhapHangs);
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
        public async Task<IActionResult> PheDuyet([FromBody] DM_NhapHangs obj)
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
        public async Task<IActionResult> HoanThanh([FromBody] DM_NhapHangs obj)
        {
            try
            {
                await _managerChiTietKho.CreateOrUpdateNhapHang(obj.ChiTietKho);
                obj.Status = (int)DatHangStatus.HoanThanh;
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
        [HttpPost("huydon")]
        public async Task<IActionResult> HuyDon([FromBody] DM_NhapHangs obj)
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
        [HttpPost("nhapkho")]
        public async Task<IActionResult> NhanHang([FromBody] DM_NhapHangs obj)
        {
            try
            {
                obj.Status = (int)DatHangStatus.NhapKho;
                await _manager.NhanHang(obj);
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
        public async Task<IActionResult> Delete([FromBody] DM_NhapHangs obj)
        {
            try
            {

                var data = await _manager.Delete(obj);
                await _managerChiTiet.DeleteByID_NhapHang(data.Code);
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
        public async Task<IActionResult> ToggleStatus([FromBody] DM_NhapHangs obj)
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
                await _managerChiTiet.BulkDeleteByID_NhapHang(lstid);
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
