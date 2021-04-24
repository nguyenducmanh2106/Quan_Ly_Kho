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
                var arrayItemDelete = listItemDelete.Split(",").Select(Int64.Parse).ToList();
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

        public async Task CreateOrUpdate(DM_ThuocTinhSPs obj)
        {
            try
            {
                if (obj.id == 0)
                {
                    await _unitOfWork.DM_ThuocTinhSPRepository.Add(obj);
                }
                else
                {
                    var data = await _unitOfWork.DM_ThuocTinhSPRepository.Get(g => g.id == obj.id);
                    data.name = obj.name;
                    data.value = obj.value;
                    await _unitOfWork.DM_ThuocTinhSPRepository.Update(data);
                    await _unitOfWork.SaveChange();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteBySanPham(int SanPhamId)
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

        public async Task<List<DM_ThuocTinhSPs>> GetAllDataBySanPham(int SanPhamId)
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
