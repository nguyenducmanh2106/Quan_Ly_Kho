using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.Utils;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;

namespace Application.Services.DM_ChucVuSerVices
{
    public class DM_ChucVuServices : IDM_ChucVuServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ChucVus> _logger;
        public DM_ChucVuServices(IUnitOfWork unitOfWork, ILogger<DM_ChucVus> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(DM_ChucVus obj)
        {
            try
            {
                await _unitOfWork.DM_ChucVuRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_ChucVus obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_ChucVuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ChucVuRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_ChucVus>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_ChucVuRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_ChucVus>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.DM_ChucVuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name)||g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ChucVus()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code=g.Code
            });
            return data;
        }
        
        public async Task<IQueryable<DM_ChucVus>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_ChucVuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower())||g.Code.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ChucVus()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
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
                var listItem = await _unitOfWork.DM_ChucVuRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_ChucVuRepository.BulkDelete(listItem.ToList());
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_ChucVus obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_ChucVuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                exist.Id = obj.Id;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_ChucVuRepository.Update(exist);
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
