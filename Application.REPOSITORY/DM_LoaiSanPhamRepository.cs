using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_LoaiSanPhamRepository : IRepository<DM_LoaiSanPhams>
    {

    }
    public class DM_LoaiSanPhamRepository : Repository<DM_LoaiSanPhams>, IDM_LoaiSanPhamRepository
    {
        public DM_LoaiSanPhamRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
