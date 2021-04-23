using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;

namespace Application.Services.DM_ThuongHieuSerVices
{
    public class DM_ThuongHieuServices : IDM_ThuongHieuServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_ThuongHieus> _logger;
        public DM_ThuongHieuServices(IUnitOfWork unitOfWork, ILogger<DM_ThuongHieus> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task Create(DM_ThuongHieus obj)
        {
            try
            {
                await _unitOfWork.DM_ThuongHieuRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<DM_ThuongHieus>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_ThuongHieuRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task Delete(DM_ThuongHieus obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_ThuongHieuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_ThuongHieuRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_ThuongHieus>> getData(int page, int pageSize, int Status, string Name, string nameSort)
        {
            var data = (await _unitOfWork.DM_ThuongHieuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ThuongHieus()
            {
                Id = g.Id,
                Name = g.Name,
                Code = g.Code,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                Description = g.Description,
                Content = g.Content,
            });
            return data;
        }

        public async Task<IQueryable<DM_ThuongHieus>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_ThuongHieuRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_ThuongHieus()
            {
                Id = g.Id,
                Name = g.Name,
                Code = g.Code,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
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
                var listItem = await _unitOfWork.DM_ThuongHieuRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_ThuongHieuRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_ThuongHieus>> GetChild(int ParentId)
        {
            try
            {
                var menuRoot = (await _unitOfWork.DM_ThuongHieuRepository.FindBy(g => g.ParentId == ParentId && g.Status != 2)).OrderBy(g => g.Ordering).ToList();
                foreach (var item in menuRoot)
                {
                    item.childNodes = await GetChild(item.Id);
                }
                return menuRoot;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(DM_ThuongHieus obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_ThuongHieuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_ThuongHieuRepository.Update(exist);
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

        public async Task Update(DM_ThuongHieus obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_ThuongHieuRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.ParentId = obj.ParentId;
                exist.Name = obj.Name;
                exist.Code = obj.Code;
                exist.Status = obj.Status;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                exist.Description = obj.Description;
                exist.Content = obj.Content;
                await _unitOfWork.DM_ThuongHieuRepository.Update(exist);
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
