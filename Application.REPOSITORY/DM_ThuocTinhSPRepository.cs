using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_ThuocTinhSPRepository : IRepository<DM_ThuocTinhSPs>
    {

    }
    public class DM_ThuocTinhSPRepository : Repository<DM_ThuocTinhSPs>, IDM_ThuocTinhSPRepository
    {
        public DM_ThuocTinhSPRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
