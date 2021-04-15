using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_DonViTinhRepository : IRepository<DM_DonViTinhs>
    {

    }
    public class DM_DonViTinhRepository : Repository<DM_DonViTinhs>, IDM_DonViTinhRepository
    {
        public DM_DonViTinhRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
