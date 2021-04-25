using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_ChiTietDeNghiDieuDongRepository : IRepository<DM_ChiTietDeNghiDieuDongs>
    {

    }
    public class DM_ChiTietDeNghiDieuDongRepository : Repository<DM_ChiTietDeNghiDieuDongs>, IDM_ChiTietDeNghiDieuDongRepository
    {
        public DM_ChiTietDeNghiDieuDongRepository(APPDbContext dbContext) : base(dbContext)
        {

        }
    }
}
