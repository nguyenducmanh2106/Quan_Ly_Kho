using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_DonViSerVices
{
    public interface IDM_DonViServices
    {
        Task<IQueryable<DM_DonVis>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_DonVis>> GetOptions(int Status, string Name);
        Task<List<DM_DonVis>> GetAllDataActive();
        Task Create(DM_DonVis obj);
        Task Update(DM_DonVis obj);
        Task Delete(DM_DonVis obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_DonVis> FindById(int Id);
    }
}
