using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_ThuongHieuRepository : IRepository<DM_ThuongHieus>
    {

    }
    public class DM_ThuongHieuRepository : Repository<DM_ThuongHieus>, IDM_ThuongHieuRepository
    {
        public DM_ThuongHieuRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
