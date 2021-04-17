using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ThuocTinhSerVices
{
    public interface IDM_ThuocTinhServices
    {
        Task<IQueryable<DM_ThuocTinhs>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_ThuocTinhs>> GetOptions(int Status, string Name);
        Task<List<DM_ThuocTinhs>> GetAllDataActive();
        Task Create(DM_ThuocTinhs obj);
        Task CreateOrUpdate(DM_ThuocTinhs obj);
        Task Update(DM_ThuocTinhs obj);
        Task Delete(DM_ThuocTinhs obj);
        Task MultiDelete(string listItemDelete);
    }
}
