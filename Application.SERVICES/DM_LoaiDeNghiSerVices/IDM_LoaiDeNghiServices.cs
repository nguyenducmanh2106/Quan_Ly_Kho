using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_LoaiDeNghiSerVices
{
    public interface IDM_LoaiDeNghiServices
    {
        Task<IQueryable<DM_LoaiDeNghis>> getData(int page, int pageSize, int Status, string Name);
        Task<List<DM_LoaiDeNghis>> GetAllDataActive();
        Task Create(DM_LoaiDeNghis obj);
        Task Update(DM_LoaiDeNghis obj);
        Task Delete(DM_LoaiDeNghis obj);
        Task MultiDelete(string listItemDelete);
    }
}
