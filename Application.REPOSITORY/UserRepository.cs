using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IUserRepository : IRepository<Users>
    {

    }
    public class UserRepository : Repository<Users>, IUserRepository
    {
        public UserRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
