using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_LoaiSanPhamSerVices
{
    public class DM_LoaiSanPhamServices : IDM_LoaiSanPhamServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_LoaiSanPhams> _logger;
        public DM_LoaiSanPhamServices(IUnitOfWork unitOfWork, ILogger<DM_LoaiSanPhams> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(DM_LoaiSanPhams obj)
        {
            try
            {
                await _unitOfWork.DM_LoaiSanPhamRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_LoaiSanPhams obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_LoaiSanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_LoaiSanPhamRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_LoaiSanPhams>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_LoaiSanPhamRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_LoaiSanPhams>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.DM_LoaiSanPhamRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_LoaiSanPhams()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code = g.Code,
                Description = g.Description
            });
            return data;
        }

        public async Task<IQueryable<DM_LoaiSanPhams>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_LoaiSanPhamRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()) || g.Code.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_LoaiSanPhams()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code = g.Code,
                Description = g.Description
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_LoaiSanPhamRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_LoaiSanPhamRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_LoaiSanPhams obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_LoaiSanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                exist.Id = obj.Id;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                exist.Ordering = obj.Ordering;
                exist.Description = obj.Description;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_LoaiSanPhamRepository.Update(exist);
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
