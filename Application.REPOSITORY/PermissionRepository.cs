using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IPermissionRepository : IRepository<Permissions>
    {
        IQueryable<Permissions> getPermissionsRepository(int page, int pageSize, int Status, string Name);
    }
    public class PermissionRepository : Repository<Permissions>, IPermissionRepository
    {
        private readonly APPDbContext _db;
        public PermissionRepository(APPDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

        public IQueryable<Permissions> getPermissionsRepository(int page, int pageSize, int Status, string Name)
        {
            var data = (from per in _db.Permissions
                        join menu in _db.Menus on per.MenuId equals menu.Id
                        where (per.Name.ToLower().Contains(Name)||String.IsNullOrEmpty(Name)) && (per.Status == Status || Status == -1)
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
                        });
            return data;
        }
    }
}
