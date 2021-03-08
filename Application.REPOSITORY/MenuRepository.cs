using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IMenuRepository : IRepository<Menus>
    {

    }
    public class MenuRepository : Repository<Menus>, IMenuRepository
    {
        public MenuRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
