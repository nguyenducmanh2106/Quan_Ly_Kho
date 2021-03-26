using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ChucVuSerVices
{
    public interface IDM_ChucVuServices
    {
        Task<IQueryable<DM_ChucVus>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_ChucVus>> GetOptions(int Status, string Name);
        Task<List<DM_ChucVus>> GetAllDataActive();
        Task Create(DM_ChucVus obj);
        Task Update(DM_ChucVus obj);
        Task Delete(DM_ChucVus obj);
        Task MultiDelete(string listItemDelete);
    }
}
