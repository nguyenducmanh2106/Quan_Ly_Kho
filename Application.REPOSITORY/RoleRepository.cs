using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IRoleRepository : IRepository<Roles>
    {

    }
    public class RoleRepository : Repository<Roles>, IRoleRepository
    {
        public RoleRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
