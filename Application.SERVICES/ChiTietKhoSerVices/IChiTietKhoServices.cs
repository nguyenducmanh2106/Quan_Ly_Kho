using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.ChiTietKhoSerVices

{
    public interface IChiTietKhoServices
    {
        Task CreateOrUpdateNhapHang(List<ChiTietKhos> obj);
        Task CanBangKho(List<ChiTietKhos> obj);
        Task CreateOrUpdateXuatHang(List<ChiTietKhos> obj);
        Task DieuDong(List<ChiTietKhos> obj);
        Task CheckKhoGuiSanPham(List<ChiTietKhos> obj);
        int getSoLuongByID_KhoAndID_SanPham(ChiTietKhos obj);
        int getSoLuongByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        Task<List<ThongKeSoLuongViewModel>> ThongKeSoLuong(ThongKeSoLuongViewModel obj);
    }
}
