using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data
{
    public abstract class PersistentRepository<T> : Repository<T> where T : class, IAuditEntity
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        protected PersistentRepository(DbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        protected string CurrentUser =>
            _httpContextAccessor != null && _httpContextAccessor.HttpContext != null && _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated
                ? _httpContextAccessor.HttpContext.User.Identity.Name
                : "Unknown";

        public async override Task<T> Add(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            entity.CreatedBy = CurrentUser;
            entity.ModifiedDate = DateTime.Now;
            entity.ModifiedBy = CurrentUser;
            return await base.Add(entity);
        }

    }
}
