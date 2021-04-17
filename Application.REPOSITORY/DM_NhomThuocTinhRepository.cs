using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Application.UTILS;

namespace Application.REPOSITORY
{
    public interface IDM_NhomThuocTinhRepository : IRepository<DM_NhomThuocTinhs>
    {
        IQueryable<DM_NhomThuocTinhs> getDataRepository(int Status, string Name);
    }
    public class DM_NhomThuocTinhRepository : Repository<DM_NhomThuocTinhs>, IDM_NhomThuocTinhRepository
    {
        private readonly APPDbContext db;
        public DM_NhomThuocTinhRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public IQueryable<DM_NhomThuocTinhs> getDataRepository(int Status, string Name)
        {
            var data = (from nhomtt in db.DM_NhomThuocTinhs
                        where (Status == (int)StatusEnum.All || nhomtt.Status == Status) && (string.IsNullOrEmpty(Name) || nhomtt.Name.ToLower().Contains(Name.ToLower()) || nhomtt.Code.ToLower().Contains(Name.ToLower()))
                        orderby nhomtt.Ordering ascending
                        select new DM_NhomThuocTinhs()
                        {
                            Id = nhomtt.Id,
                            Name = nhomtt.Name,
                            Ordering = nhomtt.Ordering,
                            Status = nhomtt.Status,
                            Code = nhomtt.Code,
                            Description = nhomtt.Description,
                            KieuNhap = nhomtt.KieuNhap,
                            isRequired = nhomtt.isRequired,
                            lstStringThuocTinhs=db.DM_ThuocTinhs.Where(g=>g.NhomThuocTinh_Id==nhomtt.Id).Select(g=>g.Name).ToList()
                        }

                      );
            return data;
        }
    }
}
