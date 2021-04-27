using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;

namespace Application.Services.DM_ThuocTinhSPSerVices
{
    public class DM_ThuocTinhSPServices : IDM_ThuocTinhSPServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ThuocTinhSPs> _logger;
        public DM_ThuocTinhSPServices(IUnitOfWork unitOfWork, ILogger<DM_ThuocTinhSPs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task BulkDeleteBySanPham(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                foreach (var item in arrayItemDelete)
                {
                    var exist = await _unitOfWork.DM_ThuocTinhSPRepository.FindBy(g => g.sanPhamId == item);
                    if (exist == null)
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                    await _unitOfWork.DM_ThuocTinhSPRepository.BulkDelete(exist);

                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task BulkUpdate(List<DM_ThuocTinhSPs> obj)
        {
            var data = await _unitOfWork.DM_ThuocTinhSPRepository.FindBy(g => g.sanPhamId == obj[0].sanPhamId);
            if (data != null)
            {
                await _unitOfWork.DM_ThuocTinhSPRepository.BulkDelete(data);
                await _unitOfWork.SaveChange();
            }
            List<DM_ThuocTinhSPs> insertObj = obj.Select(g => new DM_ThuocTinhSPs()
            {
                name = g.name,
                value = g.value,
                sanPhamId = g.sanPhamId
            }).ToList();
            await _unitOfWork.DM_ThuocTinhSPRepository.BulkInsert(insertObj);
        }

        public async Task CreateOrUpdate(DM_ThuocTinhSPs obj)
        {
            try
            {
                var data = await _unitOfWork.DM_ThuocTinhSPRepository.FindBy(g => g.sanPhamId == obj.sanPhamId);
                if (data != null)
                {
                    await _unitOfWork.DM_ThuocTinhSPRepository.BulkDelete(data);
                    await _unitOfWork.SaveChange();
                }
                var insertObj = new DM_ThuocTinhSPs()
                {
                    name = obj.name,
                    sanPhamId = obj.sanPhamId,
                    value = obj.value
                };
                await _unitOfWork.DM_ThuocTinhSPRepository.Add(insertObj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteBySanPham(string SanPhamId)
        {
            try
            {
                var exist = await _unitOfWork.DM_ThuocTinhSPRepository.FindBy(g => g.sanPhamId == SanPhamId);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ThuocTinhSPRepository.BulkDelete(exist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_ThuocTinhSPs>> GetAllDataBySanPham(string SanPhamId)
        {
            try
            {
                var data = (await _unitOfWork.DM_ThuocTinhSPRepository.FindBy(g => g.sanPhamId == SanPhamId)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
