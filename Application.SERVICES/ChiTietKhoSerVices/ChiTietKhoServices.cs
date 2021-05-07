using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;
using Microsoft.AspNetCore.Hosting;

namespace Application.Services.ChiTietKhoSerVices
{
    public class ChiTietKhoServices : IChiTietKhoServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ChiTietKhos> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public ChiTietKhoServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<ChiTietKhos> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task CreateOrUpdate(List<ChiTietKhos> obj)
        {
            try
            {
                foreach (var item in obj)
                {
                    var isExist = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.Id_Kho && g.Id_SanPham == item.Id_SanPham));
                    if (isExist != null)
                    {
                        isExist.SoLuong += item.SoLuong;
                        await _unitOfWork.ChiTietKhoRepository.Update(isExist);
                    }
                    else
                    {
                        await _unitOfWork.ChiTietKhoRepository.Add(item);
                    }
                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DieuDong(List<ChiTietKhos> obj)
        {
            try
            {
                foreach (var item in obj)
                {
                    var isExistKhoNhan = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.ID_ChiNhanhGui && g.Id_SanPham == item.Id_SanPham));
                    var isExistKhoGui = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.ID_ChiNhanhNhan && g.Id_SanPham == item.Id_SanPham));
                    if (isExistKhoNhan != null)
                    {
                        isExistKhoNhan.SoLuong += item.SoLuong;
                        await _unitOfWork.ChiTietKhoRepository.Update(isExistKhoNhan);
                    }
                    else if (isExistKhoNhan == null)
                    {
                        item.Id_Kho = item.ID_ChiNhanhGui;
                        await _unitOfWork.ChiTietKhoRepository.Add(item);
                    }
                    if (isExistKhoGui != null)
                    {
                        isExistKhoGui.SoLuong -= item.SoLuong;
                        await _unitOfWork.ChiTietKhoRepository.Update(isExistKhoGui);
                    }
                    else if (isExistKhoGui == null)
                    {
                        throw new Exception(MessageConst.CAN_NHAP_THEM_HANG);
                    }
                    else
                    {
                        throw new Exception(MessageConst.UPDATE_FAIL);
                    }
                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task CheckKhoGuiSanPham(List<ChiTietKhos> obj)
        {
            try
            {
                List<string> arrSanPham = new List<string>();
                foreach (var item in obj)
                {
                    var data = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.ID_ChiNhanhNhan && g.Id_SanPham == item.Id_SanPham));
                    if (data == null || data.SoLuong < item.SoLuong)
                    {
                        arrSanPham.Add(item.Id_SanPham);
                    }
                }
                if (arrSanPham.Count() > 0)
                {
                    var strSanPham = string.Join(",", arrSanPham);
                    throw new Exception($"Sản phẩm {strSanPham} không đủ số lượng");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> getSoLuongByID_KhoAndID_SanPham(ChiTietKhos obj)
        {
            try
            {
                var data = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == obj.Id_Kho && g.Id_SanPham == obj.Id_SanPham));
                if (data == null)
                {
                    return 0;
                }
                else return data.SoLuong ?? 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
