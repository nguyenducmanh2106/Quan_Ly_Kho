using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ThuongHieuSerVices

{
    public interface IDM_ThuongHieuServices
    {

        Task<IQueryable<DM_ThuongHieus>> getData(int page, int pageSize, int Status, string Name, string nameSort = "");

        Task<IQueryable<DM_ThuongHieus>> GetOptions(int Status, string Name);
        Task Create(DM_ThuongHieus obj);
        Task Update(DM_ThuongHieus obj);
        Task ToggleStatus(DM_ThuongHieus obj);
        Task Delete(DM_ThuongHieus obj);
        Task MultiDelete(string listItemDelete);
        Task<List<DM_ThuongHieus>> GetChild(int ParentId);
        Task<List<DM_ThuongHieus>> GetAllDataActive();
    }
}
