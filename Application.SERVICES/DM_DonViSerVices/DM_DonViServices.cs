using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;
using Application.Services.DM_DonViSerVices;

namespace Application.Services.DM_DonViSerVices
{
    public class DM_DonViServices : IDM_DonViServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_DonVis> _logger;
        public DM_DonViServices(IUnitOfWork unitOfWork, ILogger<DM_DonVis> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(DM_DonVis obj)
        {
            try
            {
                await _unitOfWork.DM_DonViRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_DonVis obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DonViRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_DonViRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DM_DonVis> FindById(int Id)
        {
            try
            {
                var data = await _unitOfWork.DM_DonViRepository.Get(g => g.Id == Id);
                var tinhid=data.TinhId??0;
                var huyenid=data.HuyenId??0;
                var xaid=data.XaId??0;
                var tenTinh=(await _unitOfWork.DM_DonViHanhChinhRepository.Get(g=>g.Id==tinhid))?.Name??"";
                var tenHuyen=(await _unitOfWork.DM_DonViHanhChinhRepository.Get(g=>g.Id==huyenid))?.Name??"";
                var tenXa=(await _unitOfWork.DM_DonViHanhChinhRepository.Get(g=>g.Id==xaid))?.Name??"";
                data.tenTinh=tenTinh;
                data.tenHuyen=tenHuyen;
                data.tenXa=tenXa;
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_DonVis>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_DonViRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_DonVis>> getData(int page, int pageSize, int Status, string Name)
        {
            var data = (await _unitOfWork.DM_DonViRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonVis()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                Code = g.Code,
                TinhId = g.TinhId,
                HuyenId = g.HuyenId,
                XaId = g.XaId,
                Address = g.Address,
                Longitude = g.Longitude,
                Latitude = g.Latitude,
                CapDo = g.CapDo
            });
            return data;
        }

        public async Task<List<DM_DonVis>> GetDonViByLevel(int level)
        {
            try
            {
                var data = (await _unitOfWork.DM_DonViRepository.FindBy(g => g.Status == (int)StatusEnum.Active && g.CapDo == level)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_DonVis>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_DonViRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Ordering).ThenByDescending(g => g.Created_At).Select(g => new DM_DonVis()
            {
                Id = g.Id,
                Name = g.Name,
                Ordering = g.Ordering,
                ParentId = g.ParentId,
                Status = g.Status,
                Code = g.Code
            });
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_DonViRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_DonViRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_DonVis obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_DonViRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }

                exist.Id = obj.Id;
                exist.ParentId = obj.ParentId;
                exist.Name = obj.Name;
                exist.Status = obj.Status;
                exist.Ordering = obj.Ordering;
                exist.Updated_At = DateTime.Now.Date;
                exist.Code = obj.Code;
                exist.TinhId = obj.TinhId;
                exist.HuyenId = obj.HuyenId;
                exist.XaId = obj.XaId;
                exist.Address = obj.Address;
                exist.Longitude = obj.Longitude;
                exist.Latitude = obj.Latitude;
                exist.CapDo = obj.CapDo;
                await _unitOfWork.DM_DonViRepository.Update(exist);
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
