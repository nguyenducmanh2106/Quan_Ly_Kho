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

namespace Application.Services.DM_KiemKeSerVices
{
    public class DM_KiemKeServices : IDM_KiemKeServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_KiemKes> _logger;
        public DM_KiemKeServices(IUnitOfWork unitOfWork, ILogger<DM_KiemKes> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<DM_KiemKes> Create(DM_KiemKes obj)
        {
            try
            {
                obj.Created_At = DateTime.Now;
                obj.Code = Common.GenerateCodeItem();
                var data = await _unitOfWork.DM_KiemKeRepository.Add(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task CanBang(DM_KiemKes obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NhanVienCanBang = obj.NhanVienCanBang;
                exist.NgayCanBang = DateTime.Now;
                await _unitOfWork.DM_KiemKeRepository.Update(exist);
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
        public async Task KiemHang(DM_KiemKes obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayKiem = DateTime.Now;
                await _unitOfWork.DM_KiemKeRepository.Update(exist);
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
        public async Task DangKiemHang(DM_KiemKes obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                await _unitOfWork.DM_KiemKeRepository.Update(exist);
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
        public async Task HoanThanh(DM_KiemKes obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayHoanThanh = DateTime.Now;
                await _unitOfWork.DM_KiemKeRepository.Update(exist);
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
        public async Task<DM_KiemKes> Delete(DM_KiemKes obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_KiemKeRepository.Delete(obj);
                await _unitOfWork.SaveChange();
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_KiemKes>> getData(DM_KiemKeFilterModel inputModel)
        {

            var data = _unitOfWork.DM_KiemKeRepository.getData(inputModel);
            return data;
        }
        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                var listItem = await _unitOfWork.DM_KiemKeRepository.FindBy(g => arrayItemDelete.Contains(g.Code));
                await _unitOfWork.DM_KiemKeRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<DM_KiemKes> FindById(string Code)
        {
            try
            {
                //return await _unitOfWork.DM_KiemKeRepository.Get(g => g.Id == id);
                var result = _unitOfWork.DM_KiemKeRepository.FindByID_Repository(Code);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> ToTalCount(DM_KiemKeFilterModel inputModel)
        {
            var data = (await _unitOfWork.DM_KiemKeRepository.FindBy(g => ((inputModel.Status == (int)ContentStatusEnum.All || g.Status == inputModel.Status)
                    && (inputModel.Id_ChiNhanh == -1 || g.Id_ChiNhanh == inputModel.Id_ChiNhanh)
                    )));
            if (!string.IsNullOrEmpty(inputModel.TuNgay))
            {
                var dateTuNgay = Convert.ToDateTime(inputModel.TuNgay).Date;
                data = data.Where(g => g.Created_At.Date >= dateTuNgay);
            }
            if (!string.IsNullOrEmpty(inputModel.DenNgay))
            {
                var dateDenNgay = Convert.ToDateTime(inputModel.DenNgay).Date;
                data = data.Where(g => g.Created_At.Date <= dateDenNgay);
            }
            if (!string.IsNullOrEmpty(inputModel.NgayTao))
            {
                var date = Convert.ToDateTime(inputModel.NgayTao).Date;
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                {
                    data = data.Where(g => g.Created_At.Date >= date);
                }
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                {
                    data = data.Where(g => g.Created_At.Date <= date);
                }
                if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                {
                    data = data.Where(g => g.Created_At.Date == date);
                }
            }
            if (!string.IsNullOrEmpty(inputModel.NgayKiem))
            {
                var date = Convert.ToDateTime(inputModel.NgayKiem).Date;
                if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Bigger_Or_Equal)
                {
                    data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date >= date));
                }
                if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Smaller_Or_Equal)
                {
                    data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date <= date));
                }
                if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Equal)
                {
                    data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date == date));
                }
            }
            return data.LongCount();
        }

        public async Task Update(DM_KiemKes obj)
        {
            try
            {
                var isExist = await _unitOfWork.DM_KiemKeRepository.Get(g => g.Code == obj.Code);
                isExist.GhiChu = obj.GhiChu;
                await _unitOfWork.DM_KiemKeRepository.Update(isExist);
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
