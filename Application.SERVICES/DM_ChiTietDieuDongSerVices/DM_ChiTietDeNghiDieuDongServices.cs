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

namespace Application.Services.DM_ChiTietDeNghiDieuDongSerVices
{
    public class DM_ChiTietDeNghiDieuDongServices : IDM_ChiTietDeNghiDieuDongServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ChiTietDeNghiDieuDongs> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public DM_ChiTietDeNghiDieuDongServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<DM_ChiTietDeNghiDieuDongs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task BulkDeleteByID_DeNghiDieuDong(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                foreach (var item in arrayItemDelete)
                {
                    var exist = await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.FindBy(g => g.ID_DeNghiDieuDong == item);
                    if (exist == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.BulkDelete(exist);

                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task BulkInsert(List<DM_ChiTietDeNghiDieuDongs> obj)
        {
            var data = await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.FindBy(g => g.ID_DeNghiDieuDong == obj[0].ID_DeNghiDieuDong);
            if (data != null)
            {
                await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.BulkDelete(data);
                await _unitOfWork.SaveChange();
            }
            List<DM_ChiTietDeNghiDieuDongs> insertObj = obj.Select(g => new DM_ChiTietDeNghiDieuDongs()
            {
                ID_DeNghiDieuDong = g.ID_DeNghiDieuDong,
                SoLuongYeuCau = g.SoLuongYeuCau,
                ID_SanPham = g.ID_SanPham
            }).ToList();
            await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.BulkInsert(insertObj);
        }

        public async Task CreateOrUpdate(DM_ChiTietDeNghiDieuDongs obj)
        {
            try
            {
                var data = await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.FindBy(g => g.ID_DeNghiDieuDong == obj.ID_DeNghiDieuDong);
                if (data != null)
                {
                    await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.BulkDelete(data);
                    await _unitOfWork.SaveChange();
                }
                var insertObj = new DM_ChiTietDeNghiDieuDongs()
                {
                    ID_DeNghiDieuDong = obj.ID_DeNghiDieuDong,
                    ID_SanPham = obj.ID_SanPham,
                    SoLuongYeuCau = obj.SoLuongYeuCau
                };
                await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.Add(insertObj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteByID_DeNghiDieuDong(string ID_DeNghiDieuDong)
        {
            try
            {
                var exist = await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.FindBy(g => g.ID_DeNghiDieuDong == ID_DeNghiDieuDong);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_ChiTietDeNghiDieuDongs> GetAllDataByID_DeNghiDieuDong(string ID_DeNghiDieuDong)
        {
            try
            {
                var data = _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.GetData_ByID_DieuDong(ID_DeNghiDieuDong);
                var result = data.ToList().Select(g => new DM_ChiTietDeNghiDieuDongs()
                {
                    id = g.id,
                    ID_DeNghiDieuDong = g.ID_DeNghiDieuDong,
                    ID_SanPham = g.ID_SanPham,
                    SoLuongDuyet = g.SoLuongDuyet,
                    SoLuongYeuCau = g.SoLuongYeuCau,
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
