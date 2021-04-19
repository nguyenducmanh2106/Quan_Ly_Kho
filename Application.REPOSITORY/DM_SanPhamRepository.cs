using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_SanPhamRepository : IRepository<DM_SanPhams>
    {

    }
    public class DM_SanPhamRepository : Repository<DM_SanPhams>, IDM_SanPhamRepository
    {
        public DM_SanPhamRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
