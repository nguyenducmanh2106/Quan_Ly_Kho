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

namespace Application.Services.PermissionSerVices
{
    public class PermissionServices : IPermissionServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<Permissions> _logger;
        public PermissionServices(IUnitOfWork unitOfWork, ILogger<Permissions> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
       
        public async Task Create(Permissions obj)
        {
            try
            {
                await _unitOfWork.PermissionRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(Permissions obj)
        {
            try
            {
                var exist = await _unitOfWork.PermissionRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.PermissionRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<Permissions>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = _unitOfWork.PermissionRepository.getPermissionsRepository(page, pageSize, Status, Name);
            return data;
        }
        
        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.PermissionRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.PermissionRepository.BulkDelete(listItem.ToList());
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(Permissions obj)
        {
            try
            {
                var exist = await _unitOfWork.PermissionRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                await _unitOfWork.PermissionRepository.Update(exist);
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

        public async Task Update(Permissions obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.PermissionRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.MenuId = obj.MenuId;
                exist.Code = obj.Code;
                exist.Ordering = obj.Ordering;
                exist.Description = obj.Description;
                await _unitOfWork.PermissionRepository.Update(exist);
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
