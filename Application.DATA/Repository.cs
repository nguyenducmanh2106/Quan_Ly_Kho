using LinqKit;
using Microsoft.EntityFrameworkCore;
using Portal.Data.BulkExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
//using Application.Data.BulkExtensions;
namespace Application.Data
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;

        public Repository(DbContext dbContext)
        {
            _context = dbContext;

        }
        public async virtual Task<T> Add(T entity)
        {
            //var result = await _context.Set<T>().AddAsync(entity);
            //return result.Entity;
            var result = _context.Set<T>().Add(entity);
            var insertedRows = await _context.SaveChangesAsync();

            if (insertedRows > 0)
                return result.Entity;
            else
                return null;

        }

        public async virtual Task BulkInsert(IList<T> items)
        {
            await _context.BulkInsertAsync<T>(items);
        }

        public async virtual Task Update(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _context.Set<T>().Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
            }
            await Task.FromResult(true);
        }

        public async virtual Task BulkUpdate(IList<T> items)
        {
            //await _context.BulkUpdateAsync(items);
        }

        public async virtual Task Delete(T entity)
        {
            await _context.BulkDeleteAsync<T>(new List<T> { entity });
        }

        public async virtual Task BulkDelete(IList<T> items)
        {
            if (items == null || !items.Any())
                return;
            await _context.BulkDeleteAsync(items);
        }

        public async virtual Task<T> Get(Expression<Func<T, bool>> predicate, string include = "")
        {
            var query = _context.Set<T>().AsQueryable<T>().AsNoTracking();
            //query = BuildIncludeQuery(query, include).AsExpandable();
            return await query.Where(predicate).FirstOrDefaultAsync();
        }

        public async virtual Task<IQueryable<T>> GetAll(string include = "")
        {
            var query = _context.Set<T>().AsQueryable<T>().AsNoTracking();
            //query = BuildIncludeQuery(query, include).AsExpandable();
            return await Task.FromResult(query);
        }

        public async virtual Task<IQueryable<T>> FindBy(Expression<Func<T, bool>> predicate, string include = "")
        {
            var query = _context.Set<T>().Where(predicate).AsQueryable<T>().AsNoTracking();
            //query = BuildIncludeQuery(query, include).AsExpandable();

            return await Task.FromResult(query);
        }

        public IQueryable<T> BuildIncludeQuery(IQueryable<T> query, string include)
        {
            if (string.IsNullOrWhiteSpace(include))
                return query;

            var includeEntities = include.Split(',');
            if (includeEntities == null || !includeEntities.Any())
                return query;

            foreach (var entity in includeEntities)
            {
                query = query.Include(entity);
            }

            return query;
        }

        public virtual async Task<int> BulkDelete(IQueryable<T> items)
        {
            //return 0;
            return await Task.FromResult(items.BatchDeleteAsync());
        }

        public virtual async Task BulkUpdate(IQueryable<T> items, Expression<Func<T, T>> value)
        {
            await items.BatchUpdateAsync(value);
        }

    }
}
