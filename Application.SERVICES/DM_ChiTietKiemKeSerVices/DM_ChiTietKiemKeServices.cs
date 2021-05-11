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

namespace Application.Services.DM_ChiTietKiemKeSerVices
{
    public class DM_ChiTietKiemKeServices : IDM_ChiTietKiemKeServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ChiTietKiemKes> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public DM_ChiTietKiemKeServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<DM_ChiTietKiemKes> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task BulkDeleteByID_KiemKe(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                foreach (var item in arrayItemDelete)
                {
                    var exist = await _unitOfWork.DM_ChiTietKiemKeRepository.FindBy(g => g.ID_KiemKe == item);
                    if (exist == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    await _unitOfWork.DM_ChiTietKiemKeRepository.BulkDelete(exist);

                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task TaoPhieu(List<DM_ChiTietKiemKes> obj)
        {
            List<DM_ChiTietKiemKes> insertObj = obj.Select(g => new DM_ChiTietKiemKes()
            {
                ID_KiemKe = g.ID_KiemKe,
                TonChiNhanh = g.TonChiNhanh,
                ID_SanPham = g.ID_SanPham,
            }).ToList();
            await _unitOfWork.DM_ChiTietKiemKeRepository.BulkInsert(insertObj);
        }

        public async Task KiemHang(List<DM_ChiTietKiemKes> item)
        {
            try
            {
                foreach(var obj in item)
                {
                    var data = await _unitOfWork.DM_ChiTietKiemKeRepository.Get(g => g.Id == obj.Id);
                    if (data == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    data.TonThucTe = obj.TonThucTe;
                    data.GhiChu = obj.GhiChu;
                    await _unitOfWork.DM_ChiTietKiemKeRepository.Update(data);
                }
                
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteByID_KiemKe(string ID_KiemKe)
        {
            try
            {
                var exist = await _unitOfWork.DM_ChiTietKiemKeRepository.FindBy(g => g.ID_KiemKe == ID_KiemKe);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ChiTietKiemKeRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_ChiTietKiemKes> GetAllDataByID_KiemKe(string ID_KiemKe)
        {
            try
            {
                var data = _unitOfWork.DM_ChiTietKiemKeRepository.GetData_ByID_KiemKe(ID_KiemKe);
                var result = data.ToList().Select(g => new DM_ChiTietKiemKes()
                {
                    Id = g.Id,
                    ID_KiemKe = g.ID_KiemKe,
                    ID_SanPham = g.ID_SanPham,
                    TonThucTe = g.TonThucTe,
                    TonChiNhanh = g.TonChiNhanh,
                    GhiChu = g.GhiChu,
                    LyDo = g.LyDo,
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
