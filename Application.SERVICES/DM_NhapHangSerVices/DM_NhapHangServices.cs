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

namespace Application.Services.DM_NhapHangSerVices
{
    public class DM_NhapHangServices : IDM_NhapHangServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DM_NhapHangs> _logger;
        public DM_NhapHangServices(IUnitOfWork unitOfWork, ILogger<DM_NhapHangs> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<DM_NhapHangs> Create(DM_NhapHangs obj)
        {
            try
            {
                DateTime? isNull = null;
                obj.NgayHenGiao = obj.strNgayHenGiao != null ? Convert.ToDateTime(obj.strNgayHenGiao) : isNull;
                obj.Created_At = DateTime.Now;
                obj.Code = Common.GenerateCodeItem();
                var data = await _unitOfWork.DM_NhapHangRepository.Add(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task ToggleStatus(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayDuyet = DateTime.Now;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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
        public async Task PheDuyet(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.TaiKhoanDuyet = obj.TaiKhoanDuyet;
                exist.NgayDuyet = DateTime.Now;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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
        public async Task TuChoi(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayHuyDon = DateTime.Now;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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
        public async Task NhanHang(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayNhapKho = DateTime.Now;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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
        public async Task HoanThanh(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                exist.Status = obj.Status;
                exist.NgayHoanThanh = DateTime.Now;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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
        public async Task<DM_NhapHangs> Delete(DM_NhapHangs obj)
        {
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                await _unitOfWork.DM_NhapHangRepository.Delete(obj);
                await _unitOfWork.SaveChange();
                return obj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DM_NhapHangs>> getData(DM_NhapHangFilterModel inputModel)
        {

            var data = _unitOfWork.DM_NhapHangRepository.getData(inputModel);
            return data;
        }
        public async Task MultiDelete(string listItemDelete)
        {
            try
            {
                var arrayItemDelete = listItemDelete.Split(",");
                var listItem = await _unitOfWork.DM_NhapHangRepository.FindBy(g => arrayItemDelete.Contains(g.Code));
                await _unitOfWork.DM_NhapHangRepository.BulkDelete(listItem.ToList());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(DM_NhapHangs obj)
        {
            //await _unitOfWork.CreateTransaction();
            try
            {
                var exist = await _unitOfWork.DM_NhapHangRepository.Get(g => g.Code == obj.Code);
                if (exist == null)
                {
                    throw new Exception(MessageConst.DATA_NOT_FOUND);
                }
                DateTime? isNull = null;
                obj.NgayHenGiao = obj.strNgayHenGiao != null ? Convert.ToDateTime(obj.strNgayHenGiao) : isNull;
                exist.Updated_At = DateTime.Now.Date;
                exist.Updated_By = obj.Updated_By;
                exist.ID_ChiNhanhNhan = obj.ID_ChiNhanhNhan;
                exist.ID_NhaCungCap = obj.ID_NhaCungCap;
                exist.TongTienPhaiTra = obj.TongTienPhaiTra;
                exist.TongTien = obj.TongTien;
                exist.TongSoLuong = obj.TongSoLuong;
                exist.Description = obj.Description;
                exist.ChietKhau = obj.ChietKhau;
                await _unitOfWork.DM_NhapHangRepository.Update(exist);
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


        public async Task<DM_NhapHangs> FindById(string Code)
        {
            try
            {
                //return await _unitOfWork.DM_NhapHangRepository.Get(g => g.Id == id);
                var result = _unitOfWork.DM_NhapHangRepository.FindByID_Repository(Code);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<long> ToTalCount(DM_NhapHangFilterModel inputModel)
        {
            var data = (await _unitOfWork.DM_NhapHangRepository.FindBy(g => ((inputModel.Status == (int)ContentStatusEnum.All || g.Status == inputModel.Status) && (string.IsNullOrEmpty(inputModel.Name) || g.Code.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhNhan == -1 || g.ID_ChiNhanhNhan == inputModel.ID_ChiNhanhNhan)
                    )));
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
            if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
            {
                var date = Convert.ToDateTime(inputModel.NgayDuyet).Date;
                if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Bigger_Or_Equal)
                {
                    data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet >= date));
                }
                if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Smaller_Or_Equal)
                {
                    data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet <= date));
                }
                if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Equal)
                {
                    data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet == date));
                }
            }
            if (!string.IsNullOrEmpty(inputModel.NgayNhapKho))
            {
                var date = Convert.ToDateTime(inputModel.NgayNhapKho).Date;
                if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Bigger_Or_Equal)
                {
                    data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho >= date));
                }
                if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Smaller_Or_Equal)
                {
                    data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho <= date));
                }
                if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Equal)
                {
                    data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho == date));
                }
            }
            if (!string.IsNullOrEmpty(inputModel.NgayHenGiao))
            {
                var date = Convert.ToDateTime(inputModel.NgayHenGiao).Date;
                if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Bigger_Or_Equal)
                {
                    data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao >= date));
                }
                if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Smaller_Or_Equal)
                {
                    data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao <= date));
                }
                if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Equal)
                {
                    data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao == date));
                }
            }
            return data.LongCount();
        }

    }
}
