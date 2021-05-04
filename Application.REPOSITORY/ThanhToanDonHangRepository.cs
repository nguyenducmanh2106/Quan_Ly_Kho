using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IThanhToanDonHangRepository : IRepository<ThanhToanDonHangs>
    {
        List<ThanhToanDonHangs> getListByID_NhapHang(string ID_NhapHang);
        Decimal TongDaThanhToan(string ID_NhapHang);
    }
    public class ThanhToanDonHangRepository : Repository<ThanhToanDonHangs>, IThanhToanDonHangRepository
    {
        private readonly APPDbContext db;
        public ThanhToanDonHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public List<ThanhToanDonHangs> getListByID_NhapHang(string ID_NhapHang)
        {
            try
            {
                var data = (from tt in db.ThanhToanDonHangs
                            where tt.ID_NhapHang == ID_NhapHang
                            select new ThanhToanDonHangs()
                            {
                                Id = tt.Id,
                                ID_NhapHang = tt.ID_NhapHang,
                                TongTienDaTra = tt.TongTienDaTra,
                                NgayThanhToan = tt.NgayThanhToan,
                                HinhThucThanhToan = tt.HinhThucThanhToan,
                                tenHinhThucThanhToan = tt.HinhThucThanhToan == 1 ? "Tiền mặt" : "Chuyển khoản",
                                NguoiThanhToan = tt.NguoiThanhToan,
                                tenNguoiThanhToan = db.Users.SingleOrDefault(g => g.Id == tt.NguoiThanhToan).FullName
                            }
                          ).OrderBy(g => g.NgayThanhToan).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public decimal TongDaThanhToan(string ID_NhapHang)
        {
            var data = (from tt in db.ThanhToanDonHangs
                        where tt.ID_NhapHang == ID_NhapHang
                        select new ThanhToanDonHangs()
                        {
                            Id = tt.Id,
                            ID_NhapHang = tt.ID_NhapHang,
                            TongTienDaTra = tt.TongTienDaTra,
                            NgayThanhToan = tt.NgayThanhToan,
                            HinhThucThanhToan = tt.HinhThucThanhToan,
                            tenHinhThucThanhToan = tt.HinhThucThanhToan == 1 ? "Tiền mặt" : "Chuyển khoản",
                            NguoiThanhToan = tt.NguoiThanhToan,
                            tenNguoiThanhToan = db.Users.SingleOrDefault(g => g.Id == tt.NguoiThanhToan).FullName
                        }
                         ).ToList().Sum(g => g.TongTienDaTra);
            return (decimal)data;
        }
    }
}
