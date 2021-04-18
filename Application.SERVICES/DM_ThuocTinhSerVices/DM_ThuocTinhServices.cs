using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ThuocTinhSerVices
{
    public class DM_ThuocTinhServices : IDM_ThuocTinhServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ThuocTinhs> _logger;
        public DM_ThuocTinhServices(IUnitOfWork unitOfWork, ILogger<DM_ThuocTinhs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task BulkCreate(List<DM_ThuocTinhs> obj)
        {
            try
            {
                var listThuocTinh = await _unitOfWork.DM_ThuocTinhRepository.FindBy(g => g.NhomThuocTinh_Id == obj[0].NhomThuocTinh_Id);
                await _unitOfWork.DM_ThuocTinhRepository.BulkDelete(listThuocTinh);
                await _unitOfWork.SaveChange();
                await _unitOfWork.DM_ThuocTinhRepository.BulkInsert(obj);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Create(DM_ThuocTinhs obj)
        {
            try
            {
                await _unitOfWork.DM_ThuocTinhRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_ThuocTinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_ThuocTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ThuocTinhRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_ThuocTinhs>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_ThuocTinhRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_ThuocTinhs>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.DM_ThuocTinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ThuocTinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code = g.Code,
                Description = g.Description,
                NhomThuocTinh_Id = g.NhomThuocTinh_Id
            });
            return data;
        }

        public async Task<IQueryable<DM_ThuocTinhs>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_ThuocTinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()) || g.Code.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ThuocTinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code = g.Code,
                Description = g.Description,
                NhomThuocTinh_Id = g.NhomThuocTinh_Id
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_ThuocTinhRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_ThuocTinhRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_ThuocTinhs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_ThuocTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                exist.Ordering = obj.Ordering;
                exist.Description = obj.Description;
                exist.NhomThuocTinh_Id = obj.NhomThuocTinh_Id;
                await _unitOfWork.DM_ThuocTinhRepository.Update(exist);
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
