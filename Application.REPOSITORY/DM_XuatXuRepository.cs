using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IDM_XuatXuRepository : IRepository<DM_XuatXus>
    {

    }
    public class DM_XuatXuRepository : Repository<DM_XuatXus>, IDM_XuatXuRepository
    {
        public DM_XuatXuRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
