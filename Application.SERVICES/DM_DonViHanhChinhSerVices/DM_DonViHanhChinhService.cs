using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;

namespace Application.Services.DM_DonViHanhChinhSerVices
{
    public class DM_DonViHanhChinhService : IDM_DonViHanhChinhService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_DonViHanhChinhs> _logger;
        public DM_DonViHanhChinhService(IUnitOfWork unitOfWork, ILogger<DM_DonViHanhChinhs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task Create(DM_DonViHanhChinhs obj)
        {
            try
            {
                await _unitOfWork.DM_DonViHanhChinhRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_DonViHanhChinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DonViHanhChinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_DonViHanhChinhRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_DonViHanhChinhs>> getData(int page, int pageSize, int Status, string Name, string nameSort)
        {
            var data = (await _unitOfWork.DM_DonViHanhChinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonViHanhChinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                Code = g.Code
            });
            return data;
        }

        public async Task<IQueryable<DM_DonViHanhChinhs>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_DonViHanhChinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonViHanhChinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                Code = g.Code
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_DonViHanhChinhRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_DonViHanhChinhRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      

        public async Task ToggleStatus(DM_DonViHanhChinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DonViHanhChinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_DonViHanhChinhRepository.Update(exist);
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

        public async Task Update(DM_DonViHanhChinhs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_DonViHanhChinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.ParentId = obj.ParentId;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                exist.Code = obj.Code;
                await _unitOfWork.DM_DonViHanhChinhRepository.Update(exist);
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
