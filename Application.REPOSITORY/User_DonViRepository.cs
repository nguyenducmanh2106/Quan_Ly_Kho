using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.REPOSITORY
{
    public interface IUser_DonViRepository : IRepository<User_DonVis>
    {

    }
    public class User_DonViRepository : Repository<User_DonVis>, IUser_DonViRepository
    {
        public User_DonViRepository(APPDbContext dbContext) : base(dbContext)
        {
        }
    }
}
