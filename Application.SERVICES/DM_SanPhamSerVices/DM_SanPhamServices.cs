﻿using Microsoft.Extensions.Logging;
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


        public async Task Create(DM_SanPhams obj)
        {
            try
            {
                obj.Created_At = DateTime.Now.Date;
                await _unitOfWork.DM_SanPhamRepository.Add(obj);
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

        public async Task<IQueryable<DM_SanPhams>> getData([FromBody] SanPhamFilterModel inputModel)
        {
            var data = (await _unitOfWork.DM_SanPhamRepository.FindBy(g => (inputModel.Status == (int)StatusEnum.All || g.Status == inputModel.Status)
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
                Updated_By = g.Updated_By
            });
            if (inputModel.TypeFilterNgayTao != (int)TypeFilter.Bigger_Or_Equal)
            {
                var date = Convert.ToDateTime(inputModel.NgayTao);
                data = data.Where(g => g.Created_At >= date);
            }
            if (inputModel.TypeFilterNgayTao != (int)TypeFilter.Smaller_Or_Equal)
            {
                var date = Convert.ToDateTime(inputModel.NgayTao);
                data = data.Where(g => g.Created_At <= date);
            }
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
        public async Task ChangePermission(DM_SanPhams obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Permission = obj.Permission;
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
        public async Task ChangePassUser(DM_SanPhams obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.PassWord = obj.PassWord;
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
                return await _unitOfWork.DM_SanPhamRepository.Get(g => g.Id == id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
