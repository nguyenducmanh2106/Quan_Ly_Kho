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

namespace Application.Services.MenuSerVices
{
    public class MenuServices : IMenuServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<Menus> _logger;
        public MenuServices(IUnitOfWork unitOfWork, ILogger<Menus> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        //public List<object> GetChildGroup(int parentId, List<string> roles = null, string code = "", int langId = 0)
        //{
        //    var result = new List<object>();

        //    //users - usergroups
        //    var lstNhomQuyen =  _unitOfWork.MenuRepository.FindBy(g => g.ParentId == parentId).;
        //    foreach (var itemNhomQuyen in lstNhomQuyen)
        //    {
        //        var child = GetChildGroup(itemNhomQuyen.Id, roles, code, langId);
        //        var permission = GetPermissionGroup(itemNhomQuyen.Id.ToString(), roles, langId);
        //        child.AddRange(permission);
        //        if (child.Count > 0)
        //        {
        //            var obj = new
        //            {
        //                id = "",
        //                text = itemNhomQuyen.Name,
        //                state = "closed",
        //                iconCls = "hide",
        //                children = child
        //            };
        //            result.Add(obj);
        //        }
        //        else
        //        {
        //            var obj = new
        //            {
        //                id = "",
        //                text = itemNhomQuyen.Name,
        //                iconCls = "hide",
        //                state = "closed"
        //            };
        //            result.Add(obj);
        //        }

        //    }



        //    return result;
        //}

        //public List<object> GetPermissionGroup(string groupId = "", List<string> roles = null, int langId = 0)
        //{
        //    var result = new List<object>();
        //    if (string.IsNullOrEmpty(groupId)) return result;
        //    var lstPermission = db.Permission.Where(g => g.AdminMenuID != null && g.AdminMenuID.Value.ToString() == groupId && g.LangId == langId).ToList();
        //    foreach (var itemPermission in lstPermission)
        //    {
        //        var check = roles != null && roles.Contains(itemPermission.Code);

        //        var obj = new
        //        {
        //            id = itemPermission.Code,
        //            text = itemPermission.Name,
        //            iconCls = "hide",
        //            @checked = check
        //        };

        //        result.Add(obj);
        //    }

        //    return result;
        //}
        
        public async Task Create(Menus obj)
        {
            try
            {
                await _unitOfWork.MenuRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(Menus obj)
        {
            try
            {
                var exist = await _unitOfWork.MenuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.MenuRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<Menus>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.MenuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new Menus()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                icon=g.icon,
                Url = g.Url,
                Level = g.Level,
                isMenu = g.isMenu
            });
            return data;
        }
        
        public async Task<IQueryable<Menus>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.MenuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new Menus()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                icon=g.icon,
                Url = g.Url,
                Level = g.Level,
                isMenu = g.isMenu
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.MenuRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.MenuRepository.BulkDelete(listItem.ToList());
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(Menus obj)
        {
            try
            {
                var exist = await _unitOfWork.MenuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.MenuRepository.Update(exist);
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

        public async Task Update(Menus obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.MenuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.ParentId = obj.ParentId;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.isMenu = obj.isMenu;
                exist.Url = obj.Url;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                exist.icon = obj.icon;
                await _unitOfWork.MenuRepository.Update(exist);
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
