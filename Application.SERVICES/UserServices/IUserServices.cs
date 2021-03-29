﻿using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public interface IUserServices
    {
        Task<IQueryable<Users>> getData(int page, int pageSize, int Status, string Name,int ChucVuId);
        Task ChangePassUser(Users obj);
        Task Create(Users obj);
        Task Update(Users obj);
        Task ToggleStatus(Users obj);
        Task Delete(Users obj);
        Task MultiDelete(string listItemDelete);
        Task<Users> Login(string username,string password);
        Task<Users> FindById(int id);
    }
}
