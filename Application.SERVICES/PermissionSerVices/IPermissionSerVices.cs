using Application.MODELS;
using Application.MODELS.ViewModels;
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
        List<DataPermissionModal> GetChildGroup(int parentId, List<string> roles = null, string code = "", int langId = 0,string indexParent="0");
        List<DataPermissionModal> GetDataPermission(int parentId, List<string> roles = null, string code = "", int langId = 0,string indexParent="0");
        List<DataPermissionModal> GetPermissionGroup(string groupId = "", List<string> roles = null, int langId = 0,string indexParent="",int startIndex=0);
        Task<List<DataPermissionModal>> DataPermission(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0);
        Task<List<DataPermissionModal>> TraiPhangPermission(int permissId = 0, int usergroupId = 0, string code = "", int langId = 0);
    }
}
