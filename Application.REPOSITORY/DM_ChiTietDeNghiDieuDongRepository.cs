using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IDM_ChiTietDeNghiDieuDongRepository : IRepository<DM_ChiTietDeNghiDieuDongs>
    {
        IQueryable<DM_ChiTietDeNghiDieuDongs> GetData_ByID_DieuDong(int ID_DieuDong);
    }
    public class DM_ChiTietDeNghiDieuDongRepository : Repository<DM_ChiTietDeNghiDieuDongs>, IDM_ChiTietDeNghiDieuDongRepository
    {
        private readonly APPDbContext db;
        public DM_ChiTietDeNghiDieuDongRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public IQueryable<DM_ChiTietDeNghiDieuDongs> GetData_ByID_DieuDong(int ID_DieuDong)
        {
            try
            {
                var data = (from chitiet in db.DM_ChiTietDeNghiDieuDongs
                            join sanpham in db.DM_SanPhams on chitiet.ID_SanPham equals sanpham.Id into SanPhamDefault
                            from sanPhamEmty in SanPhamDefault.DefaultIfEmpty()
                            join donViTinh in db.DM_DonViTinhs on sanPhamEmty.DonViTinh_Id equals donViTinh.Id into DVTDefault
                            from donvitinhEmty in DVTDefault.DefaultIfEmpty()
                            where chitiet.ID_DeNghiDieuDong == ID_DieuDong
                            select new DM_ChiTietDeNghiDieuDongs()
                            {
                                id = chitiet.id,
                                ID_DeNghiDieuDong = chitiet.ID_DeNghiDieuDong,
                                ID_SanPham = chitiet.ID_SanPham,
                                SoLuongDuyet = chitiet.SoLuongDuyet,
                                SoLuongYeuCau = chitiet.SoLuongYeuCau,
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
