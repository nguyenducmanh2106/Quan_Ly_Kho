using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IUserGroupRepository : IRepository<UserGroups>
    {

    }
    public class UserGroupRepository : Repository<UserGroups>, IUserGroupRepository
    {
        public UserGroupRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
