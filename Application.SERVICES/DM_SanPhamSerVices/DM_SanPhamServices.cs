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

namespace Application.Services.DM_SanPhamSerVices
{
    public class DM_SanPhamServices : IDM_SanPhamServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_SanPhams> _logger;
        public DM_SanPhamServices(IUnitOfWork unitOfWork, ILogger<DM_SanPhams> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task<DM_SanPhams> Create(DM_SanPhams obj)
        {
            try
            {
                obj.Created_At = DateTime.Now.Date;
                var data = await _unitOfWork.DM_SanPhamRepository.Add(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_SanPhams obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_SanPhamRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_SanPhams>> getData(SanPhamFilterModel inputModel)
        {

            var data = _unitOfWork.DM_SanPhamRepository.getDataRepository(inputModel);
            return data;
        }

        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",").Select(Int32.Parse).ToList();
                var listItem = await _unitOfWork.DM_SanPhamRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_SanPhamRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task ToggleStatus(DM_SanPhams obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                await _unitOfWork.DM_SanPhamRepository.Update(exist);
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

        public async Task Update(DM_SanPhams obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Name = obj.Name;
                exist.Code = obj.Code;
                exist.Barcode = obj.Barcode;
                exist.LoaiSP = obj.LoaiSP;
                exist.ThuongHieu_Id = obj.ThuongHieu_Id;
                exist.XuatXu_Id = obj.XuatXu_Id;
                exist.KhoiLuong = obj.KhoiLuong;
                exist.DonViTinh_Id = obj.DonViTinh_Id;
                exist.KichThuoc = obj.KichThuoc;
                exist.Avatar = obj.Avatar;
                exist.Status = obj.Status;
                exist.Updated_At = DateTime.Now.Date;
                exist.Updated_By = obj.Updated_By;
                exist.GiaNhap = obj.GiaNhap;
                exist.GiaBanBuon = obj.GiaBanBuon;
                exist.GiaBanLe = obj.GiaBanLe;
                exist.GiaCu = obj.GiaCu;
                exist.pathAvatar = obj.pathAvatar;
                await _unitOfWork.DM_SanPhamRepository.Update(exist);
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


        public async Task<DM_SanPhams> FindById(int id)
        {
            try
            {
                //return await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == id);
                return _unitOfWork.DM_SanPhamRepository.FindByID_Repository(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> ToTalCount(SanPhamFilterModel inputModel)
        {
            var data = (await _unitOfWork.DM_SanPhamRepository.FindBy(g => ((inputModel.Status == (int)StatusEnum.All && inputModel.Status != (int)StatusEnum.Removed) || g.Status == inputModel.Status)
             && (string.IsNullOrEmpty(inputModel.Name) || g.Code.ToLower().Contains(inputModel.Name.ToLower()) || g.Name.ToLower().Contains(inputModel.Name.ToLower()) || g.Barcode.ToLower().Contains(inputModel.Name.ToLower()))
             && (inputModel.LoaiSP == -1 || g.LoaiSP == inputModel.LoaiSP) && (inputModel.ThuongHieu_Id == -1 || g.ThuongHieu_Id == inputModel.ThuongHieu_Id)
             && (inputModel.XuatXu_Id == -1 || g.XuatXu_Id == inputModel.XuatXu_Id)
            )).Select(g => new DM_SanPhams()
            {
                Id = g.Id,
                Name = g.Name,
                Code = g.Code,
                Barcode = g.Barcode,
                LoaiSP = g.LoaiSP,
                ThuongHieu_Id = g.ThuongHieu_Id,
                XuatXu_Id = g.XuatXu_Id,
                KhoiLuong = g.KhoiLuong,
                DonViTinh_Id = g.DonViTinh_Id,
                KichThuoc = g.KichThuoc,
                Avatar = g.Avatar,
                Status = g.Status,
                Created_At = g.Created_At,
                Updated_At = g.Updated_At,
                Created_By = g.Created_By,
                Updated_By = g.Updated_By,
                GiaNhap = g.GiaNhap,
                GiaBanBuon = g.GiaBanBuon,
                GiaBanLe = g.GiaBanLe,
                GiaCu = g.GiaCu,
                pathAvatar = g.pathAvatar
            });
            return data.LongCount();
        }
    }
}
