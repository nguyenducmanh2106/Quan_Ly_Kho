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
using Application.MODELS.ViewModels;

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

        public async Task CreateOrUpdateNhapHang(List<ChiTietKhos> obj)
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
        public async Task CreateOrUpdateXuatHang(List<ChiTietKhos> obj)
        {
            try
            {
                List<string> arrThongBao = new List<string>();
                foreach (var item in obj)
                {
                    var isExist = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.Id_Kho && g.Id_SanPham == item.Id_SanPham));
                    if (isExist != null)
                    {
                        if (isExist.SoLuong >= item.SoLuong)
                        {
                            isExist.SoLuong -= item.SoLuong;
                            await _unitOfWork.ChiTietKhoRepository.Update(isExist);
                        }
                        else
                        {
                            arrThongBao.Add(item.Id_SanPham);
                        }
                    }
                    else
                    {
                        arrThongBao.Add(item.Id_SanPham);
                    }
                }
                if (arrThongBao.Count > 0)
                {
                    var strThongBao = string.Join(",", arrThongBao);
                    throw new Exception($"Sản phẩm {strThongBao} trong kho hiện không đủ số lượng");
                }
                else
                {
                    await _unitOfWork.SaveChange();
                }
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

        public int getSoLuongByID_KhoAndID_SanPham(ChiTietKhos obj)
        {
            try
            {
                var data = _unitOfWork.ChiTietKhoRepository.getSoLuongByID_KhoAndID_SanPham(obj);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int getSoLuongByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham)
        {
            try
            {
                var data = _unitOfWork.ChiTietKhoRepository.getSoLuongByID_KhoAndID_SanPham(Id_Kho, ID_SanPham);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task CanBangKho(List<ChiTietKhos> obj)
        {
            try
            {
                foreach (var item in obj)
                {
                    var isExist = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.Id_Kho && g.Id_SanPham == item.Id_SanPham));
                    if (isExist != null)
                    {
                        isExist.SoLuong = item.SoLuong;
                        await _unitOfWork.ChiTietKhoRepository.Update(isExist);
                    }
                    else
                    {
                        throw new Exception(MessageConst.DATA_NOT_FOUND);
                    }
                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ThongKeSoLuongViewModel>> ThongKeSoLuong(ThongKeSoLuongViewModel obj)
        {
            try
            {
                var data = _unitOfWork.ChiTietKhoRepository.ThongKeSoLuong(obj).Select(g => new ThongKeSoLuongViewModel()
                {
                    Id_Kho = g.Id_Kho,
                    tenKho = g.tenKho,
                    MaSP = g.MaSP,
                    tenSanPham = g.tenSanPham,
                    SoLuongTon = g.SoLuongTon,
                    SoLuongDangChuyenKho = _unitOfWork.ChiTietKhoRepository.getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP),
                    SoLuongChoNhapHangKhoKhac = _unitOfWork.ChiTietKhoRepository.getSoLuongDangChoNhapTuKhoKhacByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP),
                    SoLuongChoNhapHangNhaCungCap = _unitOfWork.ChiTietKhoRepository.getSoLuongDangChoNhapTuNhaCungCapByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP),
                    SoLuongDangXuat = _unitOfWork.ChiTietKhoRepository.getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP),
                    SoLuongThucTrongKho = g.SoLuongTon - _unitOfWork.ChiTietKhoRepository.getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP) - _unitOfWork.ChiTietKhoRepository.getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(obj.Id_Kho, g.MaSP)
                }).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
