using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Application.MODELS.ViewModels;
using Newtonsoft.Json;

namespace Application.Services.DM_DeNghiDieuDongSerVices
{
    public class DM_DeNghiDieuDongServices : IDM_DeNghiDieuDongServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_DeNghiDieuDongs> _logger;
        public DM_DeNghiDieuDongServices(IUnitOfWork unitOfWork, ILogger<DM_DeNghiDieuDongs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task<DM_DeNghiDieuDongs> Create(DM_DeNghiDieuDongs obj)
        {
            try
            {
                obj.Created_At = DateTime.Now.Date;
                var data = await _unitOfWork.DM_DeNghiDieuDongRepository.Add(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DM_DeNghiDieuDongs> Delete(DM_DeNghiDieuDongs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_DeNghiDieuDongRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_DeNghiDieuDongRepository.Delete(obj);
                await _unitOfWork.SaveChange();
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_DeNghiDieuDongs>> getData(DeNghiDieuDongFilterModel inputModel)
        {

            var data = _unitOfWork.DM_DeNghiDieuDongRepository.getDataRepository(inputModel);
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_DeNghiDieuDongRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_DeNghiDieuDongRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_DeNghiDieuDongs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_DeNghiDieuDongRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.SoDeNghiDieuDong = obj.SoDeNghiDieuDong;
                exist.Status = (int)ContentStatusEnum.Approving;
                exist.Updated_At = DateTime.Now.Date;
                exist.Updated_By = obj.Updated_By;
                exist.LoaiDeNghi_Id = obj.LoaiDeNghi_Id;
                exist.ID_ChiNhanhNhan = obj.ID_ChiNhanhNhan;
                exist.ID_BoPhanGui = obj.ID_BoPhanGui;
                await _unitOfWork.DM_DeNghiDieuDongRepository.Update(exist);
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


        public async Task<DM_DeNghiDieuDongs> FindById(int id)
        {
            try
            {
                //return await _unitOfWork.DM_DeNghiDieuDongRepository.Get(g => g.Id == id);
                return _unitOfWork.DM_DeNghiDieuDongRepository.FindByID_Repository(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> ToTalCount(DeNghiDieuDongFilterModel inputModel)
        {
            var data = (await _unitOfWork.DM_DeNghiDieuDongRepository.FindBy(g => ((inputModel.Status == (int)StatusEnum.All && inputModel.Status != (int)StatusEnum.Removed) || g.Status == inputModel.Status)
             && (string.IsNullOrEmpty(inputModel.Name) || g.Code.ToLower().Contains(inputModel.Name.ToLower()) || g.Name.ToLower().Contains(inputModel.Name.ToLower()) || g.Barcode.ToLower().Contains(inputModel.Name.ToLower()))
             && (inputModel.LoaiSP == -1 || g.LoaiSP == inputModel.LoaiSP) && (inputModel.ThuongHieu_Id == -1 || g.ThuongHieu_Id == inputModel.ThuongHieu_Id)
             && (inputModel.XuatXu_Id == -1 || g.XuatXu_Id == inputModel.XuatXu_Id)
            ));
            if (!string.IsNullOrEmpty(inputModel.NgayTao))
            {
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                {
                    var date = Convert.ToDateTime(inputModel.NgayTao);
                    data = data.Where(g => g.Created_At >= date);
                }
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                {
                    var date = Convert.ToDateTime(inputModel.NgayTao);
                    data = data.Where(g => g.Created_At <= date);
                }
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                {
                    var date = Convert.ToDateTime(inputModel.NgayTao);
                    data = data.Where(g => g.Created_At == date);
                }
            }
            return data.LongCount();
        }
    }
}
