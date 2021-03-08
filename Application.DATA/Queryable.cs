using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Application.Data
{
    public class Queryable<TEntity> : IQueryable<TEntity>
        where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;

        public Queryable(DbContext dbContext)
        {
            _dbSet = dbContext.Set<TEntity>();
        }

        public Type ElementType => ((IQueryable)_dbSet).ElementType;

        Type IQueryable.ElementType => ElementType;

        public Expression Expression => ((IQueryable)_dbSet).Expression;

        public IQueryProvider Provider => ((IQueryable)_dbSet).Provider;

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<TEntity> GetEnumerator()
        {
            return _dbSet.AsEnumerable().GetEnumerator();
        }
    }
}
