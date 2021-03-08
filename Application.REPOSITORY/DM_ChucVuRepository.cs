using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_ChucVuRepository : IRepository<DM_ChucVus>
    {

    }
    public class DM_ChucVuRepository : Repository<DM_ChucVus>, IDM_ChucVuRepository
    {
        public DM_ChucVuRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
