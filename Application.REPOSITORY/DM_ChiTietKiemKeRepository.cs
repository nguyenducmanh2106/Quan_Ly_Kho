using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IDM_ChiTietKiemKeRepository : IRepository<DM_ChiTietKiemKes>
    {
        IQueryable<DM_ChiTietKiemKes> GetData_ByID_KiemKe(string ID_KiemKe);
    }
    public class DM_ChiTietKiemKeRepository : Repository<DM_ChiTietKiemKes>, IDM_ChiTietKiemKeRepository
    {
        private readonly APPDbContext db;
        public DM_ChiTietKiemKeRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public IQueryable<DM_ChiTietKiemKes> GetData_ByID_KiemKe(string ID_KiemKe)
        {
            try
            {
                var data = (from chitiet in db.DM_ChiTietKiemKes
                            join sanpham in db.DM_SanPhams on chitiet.ID_SanPham equals sanpham.Code into SanPhamDefault
                            from sanPhamEmty in SanPhamDefault.DefaultIfEmpty()
                            join donViTinh in db.DM_DonViTinhs on sanPhamEmty.DonViTinh_Id equals donViTinh.Id into DVTDefault
                            from donvitinhEmty in DVTDefault.DefaultIfEmpty()
                            where chitiet.ID_KiemKe == ID_KiemKe
                            select new DM_ChiTietKiemKes()
                            {
                                Id = chitiet.Id,
                                ID_KiemKe = chitiet.ID_KiemKe,
                                ID_SanPham = chitiet.ID_SanPham,
                                TonChiNhanh = chitiet.TonChiNhanh,
                                TonThucTe = chitiet.TonThucTe,
                                GhiChu = chitiet.GhiChu,
                                LyDo = chitiet.LyDo,
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
