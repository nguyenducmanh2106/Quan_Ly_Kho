using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.REPOSITORY
{
    public interface IThanhToanDonHangRepository : IRepository<ThanhToanDonHangs>
    {
    }
    public class ThanhToanDonHangRepository : Repository<ThanhToanDonHangs>, IThanhToanDonHangRepository
    {
        private readonly APPDbContext db;
        public ThanhToanDonHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

    }
}
