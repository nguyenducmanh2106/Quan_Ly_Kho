using Application.Data;
using Application.MODELS;
using Application.MODELS.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IChiTietKhoRepository : IRepository<ChiTietKhos>
    {
        int getSoLuongByID_KhoAndID_SanPham(ChiTietKhos obj);
        int getSoLuongByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        int getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        int getSoLuongDangChoNhapTuKhoKhacByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        int getSoLuongDangChoNhapTuNhaCungCapByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        int getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham);
        List<ThongKeSoLuongViewModel> ThongKeSoLuong(ThongKeSoLuongViewModel obj);
        List<ThongKeSoLuongViewModel> QuanLyKho(ThongKeSoLuongViewModel obj);
    }
    public class ChiTietKhoRepository : Repository<ChiTietKhos>, IChiTietKhoRepository
    {
        private readonly APPDbContext db;
        public ChiTietKhoRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public int getSoLuongByID_KhoAndID_SanPham(ChiTietKhos obj)
        {
            try
            {
                var data = (from chitiet in db.ChiTietKhos
                            where chitiet.Id_Kho == obj.Id_Kho && chitiet.Id_SanPham == obj.Id_SanPham
                            select chitiet).SingleOrDefault();
                return data?.SoLuong ?? 0;
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
                var data = (from chitiet in db.ChiTietKhos
                            where chitiet.Id_Kho == Id_Kho && chitiet.Id_SanPham == ID_SanPham
                            select chitiet).SingleOrDefault();
                return data?.SoLuong ?? 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int getSoLuongDangChoNhapTuKhoKhacByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham)
        {
            try
            {
                var data = (from denghi in db.DM_DeNghiDieuDongs
                            join chitiet in db.DM_ChiTietDeNghiDieuDongs on denghi.Code equals chitiet.ID_DeNghiDieuDong
                            where denghi.ID_ChiNhanhGui == Id_Kho && chitiet.ID_SanPham == ID_SanPham && denghi.Status == (int)ContentStatusEnum.Approved
                            select new
                            {
                                Id_Kho = Id_Kho,
                                ID_SanPham = ID_SanPham,
                                SoLuong = chitiet.SoLuongDuyet
                            }
                          ).Sum(g => g.SoLuong);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int getSoLuongDangChoNhapTuNhaCungCapByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham)
        {
            try
            {
                var data = (from nhap in db.DM_NhapHangs
                            join chitiet in db.DM_ChiTietNhapHangs on nhap.Code equals chitiet.ID_DM_NhapHang
                            where nhap.ID_ChiNhanhNhan == Id_Kho && chitiet.ID_SanPham == ID_SanPham && (nhap.Status == (int)DatHangStatus.Duyet || nhap.Status == (int)DatHangStatus.NhapKho)
                            select new
                            {
                                Id_Kho = Id_Kho,
                                ID_SanPham = ID_SanPham,
                                SoLuong = chitiet.SoLuong
                            }
                          ).Sum(g => g.SoLuong);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham)
        {
            try
            {
                var data = (from denghi in db.DM_DeNghiDieuDongs
                            join chitiet in db.DM_ChiTietDeNghiDieuDongs on denghi.Code equals chitiet.ID_DeNghiDieuDong
                            where denghi.ID_ChiNhanhNhan == Id_Kho && chitiet.ID_SanPham == ID_SanPham && denghi.Status == (int)ContentStatusEnum.Approved
                            select new
                            {
                                Id_Kho = Id_Kho,
                                ID_SanPham = ID_SanPham,
                                SoLuong = chitiet.SoLuongDuyet
                            }
                          ).Sum(g => g.SoLuong);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(int Id_Kho, string ID_SanPham)
        {
            try
            {
                var data = (from xuat in db.DM_XuatHangs
                            join chitiet in db.DM_ChiTietXuatHangs on xuat.Code equals chitiet.ID_DM_XuatHang
                            where xuat.ID_ChiNhanhNhan == Id_Kho && chitiet.ID_SanPham == ID_SanPham && (xuat.Status == (int)DatHangStatus.Duyet || xuat.Status == (int)DatHangStatus.NhapKho)
                            select new
                            {
                                Id_Kho = Id_Kho,
                                ID_SanPham = ID_SanPham,
                                SoLuong = chitiet.SoLuong
                            }
                    ).Sum(g => g.SoLuong);
                return data;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongKeSoLuongViewModel> QuanLyKho(ThongKeSoLuongViewModel obj)
        {
            try
            {
                var data = (from chitietkho in db.ChiTietKhos
                            where ((obj.Id_Kho==-1||chitietkho.Id_Kho == obj.Id_Kho) && chitietkho.Id_SanPham == obj.MaSP
                            
                            )
                            select new ThongKeSoLuongViewModel()
                            {
                                Id_Kho = chitietkho.Id_Kho ?? 0,
                                tenKho = db.DM_DonVis.SingleOrDefault(g => g.Id == chitietkho.Id_Kho).Name,
                                CapDoDonVi = db.DM_DonVis.SingleOrDefault(g => g.Id == obj.Id_Kho).CapDo ?? 0,
                                MaSP = chitietkho.Id_SanPham,
                                tenSanPham = db.DM_SanPhams.SingleOrDefault(g => g.Code == chitietkho.Id_SanPham).Name,
                                SoLuongTon = chitietkho.SoLuong ?? 0,
                                //SoLuongDangChuyenKho = getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongChoNhapHangKhoKhac = getSoLuongDangChoNhapTuKhoKhacByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongChoNhapHangNhaCungCap = getSoLuongDangChoNhapTuNhaCungCapByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongDangXuat = getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham)
                            }
                          ).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThongKeSoLuongViewModel> ThongKeSoLuong(ThongKeSoLuongViewModel obj)
        {
            try
            {
                var data = (from chitietkho in db.ChiTietKhos
                            where chitietkho.Id_Kho == obj.Id_Kho && chitietkho.Id_SanPham == obj.MaSP
                            select new ThongKeSoLuongViewModel()
                            {
                                Id_Kho = chitietkho.Id_Kho ?? 0,
                                tenKho = db.DM_DonVis.SingleOrDefault(g => g.Id == obj.Id_Kho).Name,
                                CapDoDonVi = db.DM_DonVis.SingleOrDefault(g => g.Id == obj.Id_Kho).CapDo ?? 0,
                                MaSP = chitietkho.Id_SanPham,
                                tenSanPham = db.DM_SanPhams.SingleOrDefault(g => g.Code == chitietkho.Id_SanPham).Name,
                                SoLuongTon = chitietkho.SoLuong ?? 0,
                                //SoLuongDangChuyenKho = getSoLuongDangChuyenKhoByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongChoNhapHangKhoKhac = getSoLuongDangChoNhapTuKhoKhacByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongChoNhapHangNhaCungCap = getSoLuongDangChoNhapTuNhaCungCapByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham),
                                //SoLuongDangXuat = getSoLuongDangXuatHangKhacByID_KhoAndID_SanPham(obj.Id_Kho, chitietkho.Id_SanPham)
                            }
                          ).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
