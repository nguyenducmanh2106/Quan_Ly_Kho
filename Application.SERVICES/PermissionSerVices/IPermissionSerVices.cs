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
        List<object> GetChildGroup(int parentId, List<string> roles = null, string code = "", int langId = 0);
        List<object> GetPermissionGroup(string groupId = "", List<string> roles = null, int langId = 0);
        Task<List<object>> DataPermission(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0);
    }
}
