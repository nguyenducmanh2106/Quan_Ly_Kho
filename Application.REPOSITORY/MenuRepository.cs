using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Application.Utils;

namespace Application.REPOSITORY
{
    public interface IMenuRepository : IRepository<Menus>
    {
        List<Menus> getMenusByParentId(int ParentId);
    }
    public class MenuRepository : Repository<Menus>, IMenuRepository
    {
        readonly APPDbContext _db;
        public MenuRepository(APPDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

        public List<Menus> getMenusByParentId(int ParentId)
        {
            var data = (from menu in _db.Menus
                        where menu.ParentId == ParentId && menu.Status==(int)StatusEnum.Active
                        select menu
                      ).ToList();
            return data;
        }
    }
}
