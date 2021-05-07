using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;
using Microsoft.AspNetCore.Hosting;

namespace Application.Services.DM_ChiTietXuatHangSerVices
{
    public class DM_ChiTietXuatHangServices : IDM_ChiTietXuatHangServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ChiTietXuatHangs> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public DM_ChiTietXuatHangServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<DM_ChiTietXuatHangs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task BulkDeleteByID_XuatHang(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                foreach (var item in arrayItemDelete)
                {
                    var exist = await _unitOfWork.DM_ChiTietXuatHangRepository.FindBy(g => g.ID_DM_XuatHang == item);
                    if (exist == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    await _unitOfWork.DM_ChiTietXuatHangRepository.BulkDelete(exist);

                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task BulkInsert(List<DM_ChiTietXuatHangs> obj)
        {
            var data = await _unitOfWork.DM_ChiTietXuatHangRepository.FindBy(g => g.ID_DM_XuatHang == obj[0].ID_DM_XuatHang);
            if (data != null)
            {
                await _unitOfWork.DM_ChiTietXuatHangRepository.BulkDelete(data);
                await _unitOfWork.SaveChange();
            }
            List<DM_ChiTietXuatHangs> insertObj = obj.Select(g => new DM_ChiTietXuatHangs()
            {
                ID_DM_XuatHang = g.ID_DM_XuatHang,
                SoLuong = g.SoLuong,
                ID_SanPham = g.ID_SanPham,
                GiaXuat = g.GiaXuat
            }).ToList();
            await _unitOfWork.DM_ChiTietXuatHangRepository.BulkInsert(insertObj);
        }

        public async Task Update(DM_ChiTietXuatHangs obj)
        {
            try
            {
                var data = await _unitOfWork.DM_ChiTietXuatHangRepository.Get(g => g.Id == obj.Id);
                if (data == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                //data.SoLuongDuyet = obj.SoLuongDuyet;
                await _unitOfWork.DM_ChiTietXuatHangRepository.Update(data);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteByID_XuatHang(string ID_XuatHang)
        {
            try
            {
                var exist = await _unitOfWork.DM_ChiTietXuatHangRepository.FindBy(g => g.ID_DM_XuatHang == ID_XuatHang);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ChiTietXuatHangRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_ChiTietXuatHangs> GetAllDataByID_XuatHang(string ID_XuatHang)
        {
            try
            {
                var data = _unitOfWork.DM_ChiTietXuatHangRepository.GetData_ByID_XuatHang(ID_XuatHang);
                var result = data.ToList().Select(g => new DM_ChiTietXuatHangs()
                {
                    Id = g.Id,
                    ID_DM_XuatHang = g.ID_DM_XuatHang,
                    ID_SanPham = g.ID_SanPham,
                    SoLuong = g.SoLuong,
                    GiaXuat = g.GiaXuat,
                    tenSanPham = g.tenSanPham,
                    tenDonViTinh = g.tenDonViTinh,
                    code = g.code,
                    barCode = g.barCode,
                    imgSanPham = CustomConfigurationExtensions.ReadFileToBase64(_hostingEnvironment, g.imgSanPham)
                }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
