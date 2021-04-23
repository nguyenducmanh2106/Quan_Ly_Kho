using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;

namespace Application.Services.DM_DonViTinhSerVices
{
    public class DM_DonViTinhServices : IDM_DonViTinhServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_DonViTinhs> _logger;
        public DM_DonViTinhServices(IUnitOfWork unitOfWork, ILogger<DM_DonViTinhs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task Create(DM_DonViTinhs obj)
        {
            try
            {
                await _unitOfWork.DM_DonViTinhRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_DonViTinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DonViTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_DonViTinhRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_DonViTinhs>> getData(int page, int pageSize, int Status, string Name, string nameSort)
        {
            var data = (await _unitOfWork.DM_DonViTinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonViTinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Code = g.Code,
                Ordering = g.Ordering,
                Status = g.Status,
                Description = g.Description,
                Content = g.Content,
            });
            return data;
        }

        public async Task<IQueryable<DM_DonViTinhs>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_DonViTinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonViTinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Code = g.Code,
                Ordering = g.Ordering,
                Status = g.Status,
                Description = g.Description,
                Content = g.Content,
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_DonViTinhRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_DonViTinhRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task ToggleStatus(DM_DonViTinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DonViTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_DonViTinhRepository.Update(exist);
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
        public async Task<List<DM_DonViTinhs>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_DonViTinhRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task Update(DM_DonViTinhs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_DonViTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Name = obj.Name;
                exist.Code = obj.Code;
                exist.Status = obj.Status;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                exist.Description = obj.Description;
                exist.Content = obj.Content;
                await _unitOfWork.DM_DonViTinhRepository.Update(exist);
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
