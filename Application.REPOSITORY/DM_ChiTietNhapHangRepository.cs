using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IDM_ChiTietNhapHangRepository : IRepository<DM_ChiTietNhapHangs>
    {
        IQueryable<DM_ChiTietNhapHangs> GetData_ByID_NhapHang(string ID_NhapHang);
    }
    public class DM_ChiTietNhapHangRepository : Repository<DM_ChiTietNhapHangs>, IDM_ChiTietNhapHangRepository
    {
        private readonly APPDbContext db;
        public DM_ChiTietNhapHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public IQueryable<DM_ChiTietNhapHangs> GetData_ByID_NhapHang(string ID_NhapHang)
        {
            try
            {
                var data = (from chitiet in db.DM_ChiTietNhapHangs
                            join sanpham in db.DM_SanPhams on chitiet.ID_SanPham equals sanpham.Code into SanPhamDefault
                            from sanPhamEmty in SanPhamDefault.DefaultIfEmpty()
                            join donViTinh in db.DM_DonViTinhs on sanPhamEmty.DonViTinh_Id equals donViTinh.Id into DVTDefault
                            from donvitinhEmty in DVTDefault.DefaultIfEmpty()
                            where chitiet.ID_DM_NhapHang == ID_NhapHang
                            select new DM_ChiTietNhapHangs()
                            {
                                Id = chitiet.Id,
                                ID_DM_NhapHang = chitiet.ID_DM_NhapHang,
                                ID_SanPham = chitiet.ID_SanPham,
                                SoLuong = chitiet.SoLuong,
                                GiaNhap = chitiet.GiaNhap,
                                tenSanPham = sanPhamEmty.Name ?? "",
                                tenDonViTinh = donvitinhEmty.Name ?? "",
                                code = sanPhamEmty.Code ?? "",
                                barCode = sanPhamEmty.Barcode ?? "",
                                imgSanPham = sanPhamEmty.pathAvatar
                            }
                          );
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
