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
using Application.Services.DM_ChiTietDeNghiDieuDongSerVices;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Application.API.Middleware;
using Newtonsoft.Json;
using Application.MODELS.ViewModels;
using Application.Services.DM_DeNghiDieuDongSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/dm_denghidieudong")]
    public class DM_DeNghiDieuDongController : ControllerBase
    {
        private readonly IDM_DeNghiDieuDongServices _manager;
        private readonly IDM_ChiTietDeNghiDieuDongServices _managerThuocTinhSP;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DM_DeNghiDieuDongController(IConfiguration config, IDM_ChiTietDeNghiDieuDongServices _managerThuocTinhSP, IDM_DeNghiDieuDongServices _manager, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            this._manager = _manager;
            this._managerThuocTinhSP = _managerThuocTinhSP;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("list_data_gui")]
        public async Task<IActionResult> ListDataGui(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getDataGui(inputModel));
                var result = dataExist.Select(g => new DM_DeNghiDieuDongs()
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
                    LoaiDeNghi_Id = g.LoaiDeNghi_Id,
                    LyDoTuChoi = g.LyDoTuChoi,
                    ID_BoPhanGui = g.ID_BoPhanGui,
                    ID_ChiNhanhGui = g.ID_ChiNhanhGui,
                    ID_BoPhanNhan = g.ID_BoPhanNhan,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    ThoiGianGuiSanPham = g.ThoiGianGuiSanPham,
                    Description = g.Description,
                    tenLoaiDeNghi = g.tenLoaiDeNghi,
                    tenNguoiGui = g.tenNguoiGui,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenChiNhanhGui = g.tenChiNhanhNhan,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    ChiTietDeNghiDieuDongs = _managerThuocTinhSP.GetAllDataByID_DeNghiDieuDong(g.Code)
                }).ToList();
                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {

                    total = (await _manager.ToTalCountGui(inputModel));
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
        [HttpPost("list_data_nhan")]
        public async Task<IActionResult> ListDataNhan(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getDataNhan(inputModel));
                var result = dataExist.Select(g => new DM_DeNghiDieuDongs()
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
                    LoaiDeNghi_Id = g.LoaiDeNghi_Id,
                    LyDoTuChoi = g.LyDoTuChoi,
                    ID_BoPhanGui = g.ID_BoPhanGui,
                    ID_ChiNhanhGui = g.ID_ChiNhanhGui,
                    ID_BoPhanNhan = g.ID_BoPhanNhan,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    ThoiGianGuiSanPham = g.ThoiGianGuiSanPham,
                    Description = g.Description,
                    tenLoaiDeNghi = g.tenLoaiDeNghi,
                    tenNguoiGui = g.tenNguoiGui,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenChiNhanhGui = g.tenChiNhanhNhan,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    ChiTietDeNghiDieuDongs = _managerThuocTinhSP.GetAllDataByID_DeNghiDieuDong(g.Code)
                }).ToList();
                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {

                    total = (await _manager.ToTalCountNhan(inputModel));
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
                var result = new DM_DeNghiDieuDongs()
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
                    LoaiDeNghi_Id = g.LoaiDeNghi_Id,
                    LyDoTuChoi = g.LyDoTuChoi,
                    ID_BoPhanGui = g.ID_BoPhanGui,
                    ID_ChiNhanhGui = g.ID_ChiNhanhGui,
                    ID_BoPhanNhan = g.ID_BoPhanNhan,
                    ID_ChiNhanhNhan = g.ID_ChiNhanhNhan,
                    ThoiGianGuiSanPham = g.ThoiGianGuiSanPham,
                    Description = g.Description,
                    tenLoaiDeNghi = g.tenLoaiDeNghi,
                    tenNguoiGui = g.tenNguoiGui,
                    tenNguoiDuyet = g.tenNguoiDuyet,
                    tenChiNhanhGui = g.tenChiNhanhNhan,
                    tenChiNhanhNhan = g.tenChiNhanhNhan,
                    ChiTietDeNghiDieuDongs = _managerThuocTinhSP.GetAllDataByID_DeNghiDieuDong(g.Code)
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
        public async Task<IActionResult> Create([FromBody] DM_DeNghiDieuDongs obj)
        {
            try
            {
                var data = await _manager.Create(obj);
                if (obj.ChiTietDeNghiDieuDongs != null)
                {
                    foreach (var item in obj.ChiTietDeNghiDieuDongs)
                    {
                        item.ID_DeNghiDieuDong = data.Code;
                        await _managerThuocTinhSP.CreateOrUpdate(item);
                    }
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
        public async Task<IActionResult> Update([FromBody] DM_DeNghiDieuDongs obj)
        {
            try
            {
                await _manager.Update(obj);
                if (obj.ChiTietDeNghiDieuDongs != null)
                {
                    foreach (var item in obj.ChiTietDeNghiDieuDongs)
                    {
                        item.ID_DeNghiDieuDong = obj.Code;
                        item.id = 0;
                    }
                }
                await _managerThuocTinhSP.BulkInsert(obj.ChiTietDeNghiDieuDongs);
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
        public async Task<IActionResult> Delete([FromBody] DM_DeNghiDieuDongs obj)
        {
            try
            {

                var data = await _manager.Delete(obj);
                await _managerThuocTinhSP.DeleteByID_DeNghiDieuDong(data.Code);
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
                await _managerThuocTinhSP.BulkDeleteByID_DeNghiDieuDong(lstid);
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
