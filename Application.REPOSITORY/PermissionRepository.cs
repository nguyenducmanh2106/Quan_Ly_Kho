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
    public interface IPermissionRepository : IRepository<Permissions>
    {
        IQueryable<Permissions> getPermissionsRepository(int page, int pageSize, int Status, string Name);
        List<Permissions> getPermissionsByMenuId(string MenuId);
    }
    public class PermissionRepository : Repository<Permissions>, IPermissionRepository
    {
        private readonly APPDbContext _db;
        public PermissionRepository(APPDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

        public List<Permissions> getPermissionsByMenuId(string MenuId)
        {
            var data = (from per in _db.Permissions
                        where per.MenuId != null && per.MenuId.Value.ToString() == MenuId
                        select new Permissions()
                        {
                            Id = per.Id,
                            Name = per.Name,
                            Ordering = per.Ordering,
                            Status = per.Status,
                            Code = per.Code,
                            Description = per.Description,
                            MenuId = per.MenuId,
                        }
                      ).ToList();
            return data;
        }

        public IQueryable<Permissions> getPermissionsRepository(int page, int pageSize, int Status, string Name)
        {
            var data = (from per in _db.Permissions
                        join menu in _db.Menus on per.MenuId equals menu.Id
                        where (String.IsNullOrEmpty(Name)||per.Name.ToLower().Contains(Name.ToLower())||per.Code.ToLower().Contains(Name.ToLower())) && (per.Status == Status || Status == (int)StatusEnum.All)
                        select new Permissions()
                        {
                            Id = per.Id,
                            Name = per.Name,
                            Ordering = per.Ordering,
                            Status = per.Status,
                            Code = per.Code,
                            Description = per.Description,
                            MenuId = per.MenuId,
                            MenuName = menu.Name
                        }).OrderBy(g => g.Ordering);
            return data;
        }
    }
}
