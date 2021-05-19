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

namespace Application.Services.DM_ChiTietNhapHangSerVices
{
    public class DM_ChiTietNhapHangServices : IDM_ChiTietNhapHangServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ChiTietNhapHangs> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public DM_ChiTietNhapHangServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<DM_ChiTietNhapHangs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task BulkDeleteByID_NhapHang(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                foreach (var item in arrayItemDelete)
                {
                    var exist = await _unitOfWork.DM_ChiTietNhapHangRepository.FindBy(g => g.ID_DM_NhapHang == item);
                    if (exist == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    await _unitOfWork.DM_ChiTietNhapHangRepository.BulkDelete(exist);

                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task BulkInsert(List<DM_ChiTietNhapHangs> obj)
        {
            var data = await _unitOfWork.DM_ChiTietNhapHangRepository.FindBy(g => g.ID_DM_NhapHang == obj[0].ID_DM_NhapHang);
            if (data != null)
            {
                await _unitOfWork.DM_ChiTietNhapHangRepository.BulkDelete(data);
                await _unitOfWork.SaveChange();
            }
            List<DM_ChiTietNhapHangs> insertObj = obj.Select(g => new DM_ChiTietNhapHangs()
            {
                ID_DM_NhapHang = g.ID_DM_NhapHang,
                SoLuong = g.SoLuong,
                ID_SanPham = g.ID_SanPham,
                GiaNhap = g.GiaNhap
            }).ToList();
            await _unitOfWork.DM_ChiTietNhapHangRepository.BulkInsert(insertObj);
        }

        public async Task Update(DM_ChiTietNhapHangs obj)
        {
            try
            {
                var data = await _unitOfWork.DM_ChiTietNhapHangRepository.Get(g => g.Id == obj.Id);
                if (data == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                //data.SoLuongDuyet = obj.SoLuongDuyet;
                await _unitOfWork.DM_ChiTietNhapHangRepository.Update(data);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteByID_NhapHang(string ID_NhapHang)
        {
            try
            {
                var exist = await _unitOfWork.DM_ChiTietNhapHangRepository.FindBy(g => g.ID_DM_NhapHang == ID_NhapHang);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ChiTietNhapHangRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_ChiTietNhapHangs> GetAllDataByID_NhapHang(string ID_NhapHang, int Id_Kho)
        {
            try
            {
                var data = _unitOfWork.DM_ChiTietNhapHangRepository.GetData_ByID_NhapHang(ID_NhapHang);
                var result = data.ToList().Select(g => new DM_ChiTietNhapHangs()
                {
                    Id = g.Id,
                    ID_DM_NhapHang = g.ID_DM_NhapHang,
                    ID_SanPham = g.ID_SanPham,
                    SoLuong = g.SoLuong,
                    GiaNhap = g.GiaNhap,
                    tenSanPham = g.tenSanPham,
                    tenDonViTinh = g.tenDonViTinh,
                    code = g.code,
                    barCode = g.barCode,
                    imgSanPham = CustomConfigurationExtensions.ReadFileToBase64(_hostingEnvironment, g.imgSanPham),
                    SoLuongTrongKho = _unitOfWork.ChiTietKhoRepository.getSoLuongByID_KhoAndID_SanPham(new ChiTietKhos() { Id_Kho = Id_Kho, Id_SanPham = g.ID_SanPham }),
                    SoLuongCoTheXuat = _unitOfWork.ChiTietKhoRepository.getSoLuongByID_KhoAndID_SanPham(new ChiTietKhos() { Id_Kho = Id_Kho, Id_SanPham = g.ID_SanPham }) -
                     _unitOfWork.ChiTietKhoRepository.getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(Id_Kho, g.ID_SanPham) - _unitOfWork.ChiTietKhoRepository.getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(Id_Kho, g.ID_SanPham)
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
