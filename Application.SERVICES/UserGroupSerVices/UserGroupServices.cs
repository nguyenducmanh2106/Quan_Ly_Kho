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

namespace Application.Services.UserGroupSerVices
{
    public class UserGroupServices : IUserGroupServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<UserGroups> _logger;
        public UserGroupServices(IUnitOfWork unitOfWork, ILogger<UserGroups> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
       
        public async Task Create(UserGroups obj)
        {
            try
            {
                await _unitOfWork.UserGroupRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(UserGroups obj)
        {
            try
            {
                var exist = await _unitOfWork.UserGroupRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.UserGroupRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<UserGroups>> getData(int page, int pageSize, int Status, string Name)
        {
            var data =(await _unitOfWork.UserGroupRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
            &&(string.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
            )).OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At);
            return data;
        }
        
        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.UserGroupRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.UserGroupRepository.BulkDelete(listItem.ToList());
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(UserGroups obj)
        {
            try
            {
                var exist = await _unitOfWork.UserGroupRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                await _unitOfWork.UserGroupRepository.Update(exist);
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

        public async Task Update(UserGroups obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.UserGroupRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                exist.Ordering = obj.Ordering;
                exist.Permission = obj.Permission;
                await _unitOfWork.UserGroupRepository.Update(exist);
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
