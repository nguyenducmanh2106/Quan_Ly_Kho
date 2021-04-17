using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_ThuocTinhRepository : IRepository<DM_ThuocTinhs>
    {

    }
    public class DM_ThuocTinhRepository : Repository<DM_ThuocTinhs>, IDM_ThuocTinhRepository
    {
        public DM_ThuocTinhRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
