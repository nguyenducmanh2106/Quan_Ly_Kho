using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public interface IUserServices
    {
        Task<Users> getAllUser();
        Task<Users> Login(string username,string password);
    }
}
