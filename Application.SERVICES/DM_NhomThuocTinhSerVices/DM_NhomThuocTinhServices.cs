using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_NhomThuocTinhSerVices
{
    public class DM_NhomThuocTinhServices : IDM_NhomThuocTinhServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_NhomThuocTinhs> _logger;
        public DM_NhomThuocTinhServices(IUnitOfWork unitOfWork, ILogger<DM_NhomThuocTinhs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<DM_NhomThuocTinhs> Create(DM_NhomThuocTinhs obj)
        {
            try
            {
                var data = await _unitOfWork.DM_NhomThuocTinhRepository.Add(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_NhomThuocTinhs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhomThuocTinhRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_NhomThuocTinhRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_NhomThuocTinhs>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_NhomThuocTinhRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_NhomThuocTinhs>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = _unitOfWork.DM_NhomThuocTinhRepository.getDataRepository(Status, Name);
            return data;
        }

        public async Task<IQueryable<DM_NhomThuocTinhs>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_NhomThuocTinhRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()) || g.Code.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_NhomThuocTinhs()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                Status = g.Status,
                Code = g.Code,
                Description = g.Description,
                KieuNhap = g.KieuNhap,
                isRequired = g.isRequired
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_NhomThuocTinhRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_NhomThuocTinhRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_NhomThuocTinhs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_NhomThuocTinhRepository.Get(g => g.Id == obj.Id);
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
                exist.KieuNhap = obj.KieuNhap;
                exist.isRequired = obj.isRequired;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_NhomThuocTinhRepository.Update(exist);
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
