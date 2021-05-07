using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IDM_ChiTietXuatHangRepository : IRepository<DM_ChiTietXuatHangs>
    {
        IQueryable<DM_ChiTietXuatHangs> GetData_ByID_XuatHang(string ID_XuatHang);
    }
    public class DM_ChiTietXuatHangRepository : Repository<DM_ChiTietXuatHangs>, IDM_ChiTietXuatHangRepository
    {
        private readonly APPDbContext db;
        public DM_ChiTietXuatHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public IQueryable<DM_ChiTietXuatHangs> GetData_ByID_XuatHang(string ID_XuatHang)
        {
            try
            {
                var data = (from chitiet in db.DM_ChiTietXuatHangs
                            join sanpham in db.DM_SanPhams on chitiet.ID_SanPham equals sanpham.Code into SanPhamDefault
                            from sanPhamEmty in SanPhamDefault.DefaultIfEmpty()
                            join donViTinh in db.DM_DonViTinhs on sanPhamEmty.DonViTinh_Id equals donViTinh.Id into DVTDefault
                            from donvitinhEmty in DVTDefault.DefaultIfEmpty()
                            where chitiet.ID_DM_XuatHang == ID_XuatHang
                            select new DM_ChiTietXuatHangs()
                            {
                                Id = chitiet.Id,
                                ID_DM_XuatHang = chitiet.ID_DM_XuatHang,
                                ID_SanPham = chitiet.ID_SanPham,
                                SoLuong = chitiet.SoLuong,
                                GiaXuat = chitiet.GiaXuat,
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
