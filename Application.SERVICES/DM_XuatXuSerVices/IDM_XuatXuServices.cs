using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_XuatXuSerVices
{
    public interface IDM_XuatXuServices
    {
        Task<IQueryable<DM_XuatXus>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_XuatXus>> GetOptions(int Status, string Name);
        Task<List<DM_XuatXus>> GetAllDataActive();
        Task Create(DM_XuatXus obj);
        Task Update(DM_XuatXus obj);
        Task Delete(DM_XuatXus obj);
        Task MultiDelete(string listItemDelete);
    }
}
