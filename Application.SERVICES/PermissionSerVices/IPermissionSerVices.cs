using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.PermissionSerVices
{
    public interface IPermissionServices
    {
        Task<IQueryable<Permissions>> getData(int page, int pageSize, int Status, string Name);
        Task Create(Permissions obj);
        Task Update(Permissions obj);
        Task ToggleStatus(Permissions obj);
        Task Delete(Permissions obj);
        Task MultiDelete(string listItemDelete);
    }
}
