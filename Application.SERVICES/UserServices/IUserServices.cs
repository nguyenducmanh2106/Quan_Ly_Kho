using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public interface IUserServices
    {
        Task<IQueryable<Users>> getData(int page, int pageSize, int Status, string Name, int ChucVuId);
        Task ChangePassUser(Users obj);
        Task Create(Users obj);
        Task Update(Users obj);
        Task ToggleStatus(Users obj);
        Task Delete(Users obj);
        Task MultiDelete(string listItemDelete);
        Task<Users> Login(Users login);
        Task<Users> FindById(int id);
        Task<List<Users>> GetUserByDonVi(int Id_DonVi);
        Task ChangePermission(Users obj);
        string GetTenChucVu(int Id);
    }
}
