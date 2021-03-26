using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserGroupSerVices
{
    public interface IUserGroupServices
    {
        Task<IQueryable<UserGroups>> getData(int page, int pageSize, int Status, string Name);
        Task<List<UserGroups>> GetAllDataActive();
        Task Create(UserGroups obj);
        Task Update(UserGroups obj);
        Task ToggleStatus(UserGroups obj);
        Task Delete(UserGroups obj);
        Task MultiDelete(string listItemDelete);
    }
}
