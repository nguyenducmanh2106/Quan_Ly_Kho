using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Services.UserServices
{
    public class UserServices : IUserServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<Users> _logger;
        public UserServices(IUnitOfWork unitOfWork, ILogger<Users> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<Users> Login(Users login)
        {
            try
            {
                
                var data = (await _unitOfWork.UserRepository.Get(x => (x.UserName == login.UserName||x.Email==login.Email) && (x.PassWord == login.PassWord)&&(x.Status==(int)StatusEnum.Active)));
                var lstPermissions= (await _unitOfWork.PermissionRepository.FindBy(x => (x.Status == (int)StatusEnum.Active)));
                if (data == null)
                {
                    throw new Exception("Tài khoản hoặc mật khẩu không chính xác");
                }
                string listStringPermission="";
                if (data.UserGroupID != "" && data.UserGroupID != null)
                {
                    //Chuyeen ve mang string chuc cac id cua nhom nguoi dung
                    var strGroup = data.UserGroupID.Split(",");
                    //lay permission cua nhom nguoi dung
                    var permissionGroup = (await _unitOfWork.UserGroupRepository.FindBy(x => (strGroup.Contains(x.Id.ToString())) && (x.Status == (int)StatusEnum.Active)));
                    if (permissionGroup.LongCount() > 0)
                    {
                        foreach(var item in permissionGroup)
                        {
                            if (item.Permission != ""&& item.Permission!=null)
                            {
                                if (listStringPermission == "")
                                {
                                    listStringPermission = item.Permission;
                                }
                                else
                                {
                                    listStringPermission += $",{item.Permission}";
                                }
                            }
                        }
                    }
                }
                string fullPermission_Str = "";
                if (data.Permission != "" && data.Permission != null)
                {
                    if (listStringPermission != "")
                    {
                        fullPermission_Str = data.Permission + "," + listStringPermission;
                    }
                    else
                    {
                        fullPermission_Str = data.Permission;
                    }
                }
                else
                {
                    fullPermission_Str = listStringPermission;
                }
                var fullPermission_Arr = fullPermission_Str.Split(',').Distinct();
                var remover_Permission_Duplicated = string.Join(",", fullPermission_Arr);
                var user = new Users()
                {
                    Id = data.Id,
                    UserName = data.UserName,
                    FullName = data.FullName,
                    pathAvatar = data.pathAvatar,
                    Avatar = data.Avatar,
                    DonViId = data.DonViId,
                    ChucVuId = data.ChucVuId,
                    Permission = remover_Permission_Duplicated,
                    isRoot = data.isRoot,
                    isThongKe = data.isThongKe,
                    lstPermission = lstPermissions.ToList()
                };
                return user;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task Create(Users obj)
        {
            try
            {
                obj.Created_At = DateTime.Now.Date;
                await _unitOfWork.UserRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(Users obj)
        {
            try
            {
                var exist = await _unitOfWork.UserRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.UserRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<Users>> getData(int page, int pageSize, int Status, string Name,int ChucVuId)
        {
            var data = (await _unitOfWork.UserRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (string.IsNullOrEmpty(Name) || g.Email.ToLower().Contains(Name.ToLower()) || g.UserName.ToLower().Contains(Name.ToLower())|| g.FullName.ToLower().Contains(Name.ToLower()))
             &&(ChucVuId==-1||g.ChucVuId==ChucVuId)
            )).OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At);
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.UserRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.UserRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(Users obj)
        {
            try
            {
                var exist = await _unitOfWork.UserRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                await _unitOfWork.UserRepository.Update(exist);
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

        public async Task Update(Users obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.UserRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.UserName = obj.UserName;
                exist.Status = obj.Status;
                exist.Email = obj.Email;
                exist.FullName = obj.FullName;
                exist.DonViId = obj.DonViId;
                exist.ChucVuId = obj.ChucVuId;
                exist.Avatar = obj.Avatar;
                exist.PhoneNumber = obj.PhoneNumber;
                exist.UserGroupID = obj.UserGroupID;
                exist.isRoot = obj.isRoot;
                exist.isThongKe = obj.isThongKe;
                exist.Ordering = obj.Ordering;
                await _unitOfWork.UserRepository.Update(exist);
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
        public async Task ChangePermission(Users obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.UserRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Permission = obj.Permission;
                await _unitOfWork.UserRepository.Update(exist);
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
        public async Task ChangePassUser(Users obj)
        {
            try
            {
                var exist = await _unitOfWork.UserRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.PassWord = obj.PassWord;
                await _unitOfWork.UserRepository.Update(exist);
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

        public async Task<Users> FindById(int id)
        {
            try
            {
                return await _unitOfWork.UserRepository.Get(g => g.Id == id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
