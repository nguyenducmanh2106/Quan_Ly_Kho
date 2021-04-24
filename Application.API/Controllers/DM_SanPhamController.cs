﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.MODELS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Application.UTILS;
using Application.Services.DM_SanPhamSerVices;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using Application.API.Middleware;
using Newtonsoft.Json;
using Application.MODELS.ViewModels;
using Application.Services.DM_ThuocTinhSPSerVices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/dm_sanpham")]
    public class DM_SanPhamController : ControllerBase
    {
        private readonly IDM_SanPhamServices _manager;
        private readonly IDM_ThuocTinhSPServices _managerThuocTinhSP;
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DM_SanPhamController(IConfiguration config, IDM_ThuocTinhSPServices _managerThuocTinhSP, IDM_SanPhamServices _manager, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            this._manager = _manager;
            this._managerThuocTinhSP = _managerThuocTinhSP;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost("list_data")]
        public async Task<IActionResult> ListData(SanPhamFilterModel inputModel)
        {
            try
            {
                var totalPage = 0;
                long total = 0;
                var stt = (inputModel.page - 1) * inputModel.pageSize;
                var dataExist = (await _manager.getData(inputModel));

                if (dataExist == null)
                {
                    return Ok(new MessageError());
                }
                else
                {

                    total = (await _manager.ToTalCount(inputModel));
                    var dataFinal = dataExist.Select(g => new DM_SanPhams()
                    {
                        Id = g.Id,
                        Name = g.Name,
                        Code = g.Code,
                        Barcode = g.Barcode,
                        LoaiSP = g.LoaiSP,
                        ThuongHieu_Id = g.ThuongHieu_Id,
                        XuatXu_Id = g.XuatXu_Id,
                        KhoiLuong = g.KhoiLuong,
                        DonViTinh_Id = g.DonViTinh_Id,
                        KichThuoc = g.KichThuoc,
                        Avatar = g.Avatar,
                        Status = g.Status,
                        Created_At = g.Created_At,
                        Updated_At = g.Updated_At,
                        Created_By = g.Created_By,
                        Updated_By = g.Updated_By,
                        GiaNhap = g.GiaNhap,
                        GiaBanBuon = g.GiaBanBuon,
                        GiaBanLe = g.GiaBanLe,
                        GiaCu = g.GiaCu,
                        pathAvatar = ReadFileToBase64(g.pathAvatar),
                        tenThuongHieu = g.tenThuongHieu,
                        tenLoaiSanPham = g.tenLoaiSanPham,
                        xuatXu = g.xuatXu,
                        tenDonViTinh = g.tenDonViTinh,
                        ThuocTinhs = g.ThuocTinhs
                    });
                    totalPage = (int)Math.Ceiling(((double)total / inputModel.pageSize));
                    MessageSuccess success = new MessageSuccess()
                    {
                        result = new
                        {
                            data = dataFinal,
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
        public async Task<IActionResult> FindById(int Id = -1)
        {
            try
            {
                var g = await _manager.FindById(Id);
                var data = new DM_SanPhams()
                {
                    Id = g.Id,
                    Name = g.Name,
                    Code = g.Code,
                    Barcode = g.Barcode,
                    LoaiSP = g.LoaiSP,
                    ThuongHieu_Id = g.ThuongHieu_Id,
                    XuatXu_Id = g.XuatXu_Id,
                    KhoiLuong = g.KhoiLuong,
                    DonViTinh_Id = g.DonViTinh_Id,
                    KichThuoc = g.KichThuoc,
                    Avatar = g.Avatar,
                    Status = g.Status,
                    Created_At = g.Created_At,
                    Updated_At = g.Updated_At,
                    Created_By = g.Created_By,
                    Updated_By = g.Updated_By,
                    GiaNhap = g.GiaNhap,
                    GiaBanBuon = g.GiaBanBuon,
                    GiaBanLe = g.GiaBanLe,
                    GiaCu = g.GiaCu,
                    pathAvatar = ReadFileToBase64(g.pathAvatar),
                    tenThuongHieu = g.tenThuongHieu,
                    tenLoaiSanPham = g.tenLoaiSanPham,
                    xuatXu = g.xuatXu,
                    ThuocTinhs = g.ThuocTinhs
                };
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
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] DM_SanPhams obj)
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
                var data = await _manager.Create(obj);
                if (obj.ThuocTinhs != null)
                {
                    foreach (var item in obj.ThuocTinhs)
                    {
                        item.sanPhamId = data.Id;
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
            var folder = $"{this._hostingEnvironment.WebRootPath}/{_config["ImageSanPham"].ToString()}/{currentDate}";
            var filePath = $"{folder}/{filename}";
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return filePath;
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] DM_SanPhams obj)
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
                await _manager.Update(obj);
                if (obj.ThuocTinhs != null)
                {
                    foreach (var item in obj.ThuocTinhs)
                    {
                        if (item.id == 0)
                        {
                            item.sanPhamId = obj.Id;
                            await _managerThuocTinhSP.CreateOrUpdate(item);
                        }
                        else await _managerThuocTinhSP.CreateOrUpdate(item);
                    }
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

        [HttpPost("toggle-status")]
        public async Task<IActionResult> ToggleStatus([FromBody] DM_SanPhams obj)
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
        public async Task<IActionResult> Delete([FromBody] DM_SanPhams obj)
        {
            try
            {

                var data = await _manager.Delete(obj);
                await _managerThuocTinhSP.DeleteBySanPham(data.Id);
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
                await _managerThuocTinhSP.BulkDeleteBySanPham(lstid);
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
