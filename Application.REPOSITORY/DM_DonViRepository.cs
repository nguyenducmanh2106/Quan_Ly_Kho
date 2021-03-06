using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_DonViRepository : IRepository<DM_DonVis>
    {
        
    }
    public class DM_DonViRepository : Repository<DM_DonVis>, IDM_DonViRepository
    {
        public readonly APPDbContext db;
        public DM_DonViRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

       
    }
}
