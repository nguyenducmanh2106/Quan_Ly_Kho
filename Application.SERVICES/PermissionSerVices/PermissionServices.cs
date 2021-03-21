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
        public async Task<List<object>> DataPermission(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0)
        {
            var result = new List<object>();
            if (usergroupId == 0) return result;
            if (code == "users")
            {
                //var objUser = _unitOfWork.UserRepository.Find(usergroupId);
                //var lstStringRole = objUser != null && !string.IsNullOrEmpty(objUser.Permission) ? objUser.Permission.Split(',').ToList() : new List<string>();
                //result = GetChildGroup(permissId, lstStringRole, "", langId);
            }
            else
            {

                //usergroups
                var objUserGroup = await _unitOfWork.UserGroupRepository.Get(g => g.Id == usergroupId);
                var lstStringRole = objUserGroup != null && !string.IsNullOrEmpty(objUserGroup.Permission) ? objUserGroup.Permission.Split(',').ToList() : new List<string>();
                result = GetChildGroup(permissId, lstStringRole, "", langId);
            }

            return result;
        }

        public List<object> GetChildGroup(int parentId, List<string> roles = null, string code = "", int langId = 0,string indexParent="0")
        {
            var result = new List<object>();

            //users - usergroups
            var lstNhomQuyen = _unitOfWork.MenuRepository.getMenusByParentId(parentId);
            for (int index = 0; index < lstNhomQuyen.Count; index++)
            {
                var indexValue = indexParent +"-"+ index.ToString();
                var itemNhomQuyen = lstNhomQuyen[index];
                var child = GetChildGroup(itemNhomQuyen.Id, roles, code, langId, indexValue);
                var permission = GetPermissionGroup(itemNhomQuyen.Id.ToString(), roles, langId, indexValue,child.Count);
                child.AddRange(permission);
                if (child.Count > 0)
                {
                    var obj = new
                    {
                        id = "",
                        title = itemNhomQuyen.Name,
                        key = indexValue,
                        value = indexValue,
                        state = "closed",
                        iconCls = "hide",
                        children = child
                    };
                    result.Add(obj);
                }
                else
                {
                    var obj = new
                    {
                        id = "",
                        title = itemNhomQuyen.Name,
                        key = indexValue,
                        value = indexValue,
                        iconCls = "hide",
                        state = "closed"
                    };
                    result.Add(obj);
                }
            }
            return result;
        }

        public List<object> GetPermissionGroup(string groupId = "", List<string> roles = null, int langId = 0, string indexParent = "",int startIndex=0)
        {
            var result = new List<object>();
            if (string.IsNullOrEmpty(groupId)) return result;
            var lstPermission = _unitOfWork.PermissionRepository.getPermissionsByMenuId(groupId);
            for (int index = 0; index < lstPermission.Count; index++)
            {
                var itemPermission = lstPermission[index];
                var check = roles != null && roles.Contains(itemPermission.Code);
                var indexValue = startIndex + index;
                var obj = new
                {
                    id = itemPermission.Code,
                    title = itemPermission.Name,
                    value = $"{indexParent}-{indexValue}",
                    key = $"{indexParent}-{indexValue}",
                    iconCls = "hide",
                    @checked = check
                };

                result.Add(obj);
            }

            return result;
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
            catch (Exception ex)
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
