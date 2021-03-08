using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using Application.Utils;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public class UserServices : IUserServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<Users> _logger;
        public UserServices(IUnitOfWork unitOfWork, ILogger<Users> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        public Task<Users> getAllUser()
        {
            throw new NotImplementedException();
        }

        public async Task<Users> Login(string username, string password)
        {
            try
            {
                var data = (await _unitOfWork.UserRepository.Get(x => x.UserName == username && (x.PassWord == password)&&(x.Status==(int)StatusEnum.Active)));
                //if (data == null)
                //{
                //    throw new Exception(MessageConst.DATA_NOT_FOUND);
                //}
                return data;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
