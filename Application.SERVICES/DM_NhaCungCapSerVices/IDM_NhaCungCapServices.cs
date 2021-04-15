using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_NhaCungCapSerVices
{
    public interface IDM_NhaCungCapServices
    {
        Task<IQueryable<DM_NhaCungCaps>> getData(int page, int pageSize, int Status, string Name,string Phone);
        Task<IQueryable<DM_NhaCungCaps>> GetOptions(int Status, string Name);
        Task<List<DM_NhaCungCaps>> GetAllDataActive();
        Task Create(DM_NhaCungCaps obj);
        Task Update(DM_NhaCungCaps obj);
        Task Delete(DM_NhaCungCaps obj);
        Task MultiDelete(string listItemDelete);
    }
}
