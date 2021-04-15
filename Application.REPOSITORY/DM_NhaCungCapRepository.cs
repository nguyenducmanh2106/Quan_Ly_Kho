using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_NhaCungCapRepository : IRepository<DM_NhaCungCaps>
    {

    }
    public class DM_NhaCungCapRepository : Repository<DM_NhaCungCaps>, IDM_NhaCungCapRepository
    {
        public DM_NhaCungCapRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
