using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_LoaiDeNghiSerVices
{
    public class DM_LoaiDeNghiServices : IDM_LoaiDeNghiServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_LoaiDeNghis> _logger;
        public DM_LoaiDeNghiServices(IUnitOfWork unitOfWork, ILogger<DM_LoaiDeNghis> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(DM_LoaiDeNghis obj)
        {
            try
            {
                await _unitOfWork.DM_LoaiDeNghiRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_LoaiDeNghis obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_LoaiDeNghiRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_LoaiDeNghiRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_LoaiDeNghis>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_LoaiDeNghiRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_LoaiDeNghis>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.DM_LoaiDeNghiRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            return data;
        }


        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_LoaiDeNghiRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_LoaiDeNghiRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_LoaiDeNghis obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_LoaiDeNghiRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                exist.Id = obj.Id;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                await _unitOfWork.DM_LoaiDeNghiRepository.Update(exist);
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
