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
                var arrayItemDelete = listItemDelete.Split(",").Select(Int64.Parse).ToList();
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

        public async Task CreateOrUpdate(DM_ChiTietDeNghiDieuDongs obj)
        {
            try
            {
                if (obj.id == 0)
                {
                    await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.Add(obj);
                }
                else
                {
                    var data = await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.Get(g => g.id == obj.id);
                    data.ID_SanPham = obj.ID_SanPham;
                    data.SoLuongDuyet = obj.SoLuongDuyet;
                    data.SoLuongYeuCau = obj.SoLuongYeuCau;
                    await _unitOfWork.DM_ChiTietDeNghiDieuDongRepository.Update(data);
                    await _unitOfWork.SaveChange();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteByID_DeNghiDieuDong(int ID_DeNghiDieuDong)
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

        public List<DM_ChiTietDeNghiDieuDongs> GetAllDataByID_DeNghiDieuDong(int ID_DeNghiDieuDong)
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
