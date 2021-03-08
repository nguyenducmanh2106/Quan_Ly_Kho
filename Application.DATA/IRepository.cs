using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.Data
{
    public interface IRepository<T> where T : class
    {
        Task<IQueryable<T>> GetAll(string include = "");
        Task<T> Get(Expression<Func<T, bool>> predicate, string include = "");
        Task<IQueryable<T>> FindBy(Expression<Func<T, bool>> predicate, string include = "");
        Task<T> Add(T entity);
        Task Delete(T entity);
        Task Update(T entity);
        Task BulkInsert(IList<T> items);
        Task BulkDelete(IList<T> items);
        Task<int> BulkDelete(IQueryable<T> items);
        Task BulkUpdate(IList<T> items);
        Task BulkUpdate(IQueryable<T> items, Expression<Func<T, T>> value);
    }

    
}
