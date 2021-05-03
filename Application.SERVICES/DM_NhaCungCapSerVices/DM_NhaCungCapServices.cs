using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.UTILS;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_NhaCungCapSerVices
{
    public class DM_NhaCungCapServices : IDM_NhaCungCapServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_NhaCungCaps> _logger;
        public DM_NhaCungCapServices(IUnitOfWork unitOfWork, ILogger<DM_NhaCungCaps> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Create(DM_NhaCungCaps obj)
        {
            try
            {
                await _unitOfWork.DM_NhaCungCapRepository.Add(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Delete(DM_NhaCungCaps obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhaCungCapRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_NhaCungCapRepository.Delete(obj);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_NhaCungCaps>> FindByAttributes(DM_NhaCungCaps obj)
        {
            try
            {
                var data = (await _unitOfWork.DM_NhaCungCapRepository.FindBy(g => string.IsNullOrEmpty(obj.Name)
                 || (g.Name.ToLower().Contains(obj.Name.ToLower().Trim())) || (g.Code.ToLower().Contains(obj.Name.ToLower().Trim()))
                 || (g.Phone.ToLower().Contains(obj.Name.ToLower().Trim()))
                )).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DM_NhaCungCaps> FindById(int id)
        {
            try
            {
                var data = await _unitOfWork.DM_NhaCungCapRepository.Get(g => g.Id == id);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_NhaCungCaps>> GetAllDataActive()
        {
            try
            {
                var data = (await _unitOfWork.DM_NhaCungCapRepository.FindBy(g => g.Status == (int)StatusEnum.Active)).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IQueryable<DM_NhaCungCaps>> getData(int page, int pageSize, int Status, string Name, string Phone)
        {
            var data = (await _unitOfWork.DM_NhaCungCapRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Code.ToLower().Contains(Name.ToLower()) || g.Name.ToLower().Contains(Name.ToLower()))
             && (string.IsNullOrEmpty(Phone) || g.Phone.ToLower().Contains(Phone.ToLower()))
           ));
            data = data.OrderBy(g => g.Created_At).Select(g => new DM_NhaCungCaps()
            {
                Id = g.Id,
                Name = g.Name,
                Phone = g.Phone,
                Status = g.Status,
                Code = g.Code,
                Email = g.Email,
                Address = g.Address,
                MaSoThue = g.MaSoThue,
                TenNguoiDaiDien = g.TenNguoiDaiDien,
                SDTNguoiDaiDien = g.SDTNguoiDaiDien,
                DiaChiNguoiDaiDien = g.DiaChiNguoiDaiDien,
                TenNganHang = g.TenNganHang,
                ChiNhanhNH = g.ChiNhanhNH,
                STKNganHang = g.STKNganHang,
                TenChuTKNganHang = g.TenChuTKNganHang,
                GhiChu = g.GhiChu
            });
            return data;
        }

        public async Task<IQueryable<DM_NhaCungCaps>> GetOptions(int Status, string Name)
        {
            var data = (await _unitOfWork.DM_NhaCungCapRepository.FindBy(g => (Status == (int)StatusEnum.All || g.Status == Status)
             && (String.IsNullOrEmpty(Name) || g.Name.ToLower().Contains(Name.ToLower()) || g.Code.ToLower().Contains(Name.ToLower()))
           ));
            data = data.OrderBy(g => g.Created_At).Select(g => new DM_NhaCungCaps()
            {
                Id = g.Id,
                Name = g.Name,
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
                var listItem = await _unitOfWork.DM_NhaCungCapRepository.FindBy(g => arrayItemDelete.Contains(g.Id));
                await _unitOfWork.DM_NhaCungCapRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_NhaCungCaps obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_NhaCungCapRepository.Get(g => g.Id == obj.Id);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Name = obj.Name;
                exist.Phone = obj.Phone;
                exist.Status = obj.Status;
                exist.Code = obj.Code;
                exist.Email = obj.Email;
                exist.Address = obj.Address;
                exist.MaSoThue = obj.MaSoThue;
                exist.TenNguoiDaiDien = obj.TenNguoiDaiDien;
                exist.SDTNguoiDaiDien = obj.SDTNguoiDaiDien;
                exist.DiaChiNguoiDaiDien = obj.DiaChiNguoiDaiDien;
                exist.TenNganHang = obj.TenNganHang;
                exist.ChiNhanhNH = obj.ChiNhanhNH;
                exist.STKNganHang = obj.STKNganHang;
                exist.TenChuTKNganHang = obj.TenChuTKNganHang;
                exist.GhiChu = obj.GhiChu;
                exist.Updated_At = DateTime.Now.Date;
                await _unitOfWork.DM_NhaCungCapRepository.Update(exist);
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
