using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_DonViHanhChinhRepository : IRepository<DM_DonViHanhChinhs>
    {

    }
    public class DM_DonViHanhChinhRepository : Repository<DM_DonViHanhChinhs>, IDM_DonViHanhChinhRepository
    {
        public DM_DonViHanhChinhRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
