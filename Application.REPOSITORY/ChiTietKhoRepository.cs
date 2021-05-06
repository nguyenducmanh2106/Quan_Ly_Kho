using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IChiTietKhoRepository : IRepository<ChiTietKhos>
    {
    }
    public class ChiTietKhoRepository : Repository<ChiTietKhos>, IChiTietKhoRepository
    {
        private readonly APPDbContext db;
        public ChiTietKhoRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

    }
}
