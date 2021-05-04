using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.ThanhToanDonHangSerVices
{
    public class ThanhToanDonHangServices : IThanhToanDonHangServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ThanhToanDonHangs> _logger;
        public ThanhToanDonHangServices(IUnitOfWork unitOfWork, ILogger<ThanhToanDonHangs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(ThanhToanDonHangs obj)
        {
            try
            {
                obj.NgayThanhToan = DateTime.Now;
                await _unitOfWork.ThanhToanDonHangRepository.Add(obj);
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
                var exist = await _unitOfWork.ThanhToanDonHangRepository.FindBy(g => g.ID_NhapHang == ID_NhapHang);

                await _unitOfWork.ThanhToanDonHangRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThanhToanDonHangs> GetAllDataActiveByID_NhapHang(string ID_NhapHang)
        {
            try
            {
                var data = _unitOfWork.ThanhToanDonHangRepository.getListByID_NhapHang(ID_NhapHang);

                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").ToList();
                var listItem = await _unitOfWork.ThanhToanDonHangRepository.FindBy(g => arrayItemDelete.Contains(g.ID_NhapHang));
                await _unitOfWork.ThanhToanDonHangRepository.BulkDelete(listItem);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public decimal TongDaThanhToan(string ID_NhapHang)
        {
            try
            {
                var data = _unitOfWork.ThanhToanDonHangRepository.TongDaThanhToan(ID_NhapHang);

                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(ThanhToanDonHangs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.ThanhToanDonHangRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                await _unitOfWork.ThanhToanDonHangRepository.Update(exist);
                await _unitOfWork.SaveChange();
                //_unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, MessageConst.UPDATE_FAIL, null);
                //_unitOfWork.Rollback();
                throw new Exception(MessageConst.UPDATE_FAIL);
            }
        }
    }
}
