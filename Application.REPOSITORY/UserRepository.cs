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
        string GetTenChucVu(int Id);
    }
    public class UserRepository : Repository<Users>, IUserRepository
    {
        private readonly APPDbContext _db;
        public UserRepository(APPDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

        public string GetTenChucVu(int Id)
        {
            try
            {
                var data = (from user in _db.Users
                            join chucvu in _db.DM_ChucVus on user.ChucVuId equals chucvu.Id into chucvuDefault
                            from chucvuEmty in chucvuDefault.DefaultIfEmpty()
                            where user.Id == Id
                            select chucvuEmty.Name ?? ""
                          ).SingleOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
