using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.MenuSerVices
{
    public interface IMenuServices
    {
        Task<IQueryable<Menus>> getData(int page, int pageSize, int Status, string Name, string nameSort = "");
        Task<IQueryable<Menus>> GetOptions(int Status, string Name);
        Task Create(Menus obj);
        Task Update(Menus obj);
        Task ToggleStatus(Menus obj);
        Task Delete(Menus obj);
        Task MultiDelete(string listItemDelete);
        Task<List<Menus>> GetChild(int ParentId);
    }
}
