using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_LoaiDeNghiRepository : IRepository<DM_LoaiDeNghis>
    {

    }
    public class DM_LoaiDeNghiRepository : Repository<DM_LoaiDeNghis>, IDM_LoaiDeNghiRepository
    {
        public DM_LoaiDeNghiRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
