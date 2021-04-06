using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
namespace Application.REPOSITORY
{
    public interface IUserRepository : IRepository<Users>
    {
        
    }
    public class UserRepository : Repository<Users>, IUserRepository
    {
        private readonly APPDbContext _db;
        public UserRepository(APPDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

       
    }
}
