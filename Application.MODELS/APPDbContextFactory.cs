using Microsoft.EntityFrameworkCore;
using Application.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS
{
    public interface IAPPDbContextFactory : IDbContextFactory<APPDbContext>
    {

    }
    public class APPDbContextFactory : IAPPDbContextFactory
    {
        private readonly DbContextOptions<APPDbContext> _options;
        private APPDbContext _context;
        public APPDbContextFactory(DbContextOptions<APPDbContext> options)
        {
            _options = options;
        }
        public APPDbContext GetContext()
        {
            if (_context == null) _context = new APPDbContext(_options);
            return _context;
        }
    }
}
