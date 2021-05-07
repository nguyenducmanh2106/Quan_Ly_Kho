using Application.Data;
using Application.MODELS;
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
                return data.SoLuong ?? 0;
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
    }
}
