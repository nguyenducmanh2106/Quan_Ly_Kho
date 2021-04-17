using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_NhomThuocTinhSerVices
{
    public interface IDM_NhomThuocTinhServices
    {
        Task<IQueryable<DM_NhomThuocTinhs>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_NhomThuocTinhs>> GetOptions(int Status, string Name);
        Task<List<DM_NhomThuocTinhs>> GetAllDataActive();
        Task<DM_NhomThuocTinhs> Create(DM_NhomThuocTinhs obj);
        Task Update(DM_NhomThuocTinhs obj);
        Task Delete(DM_NhomThuocTinhs obj);
        Task MultiDelete(string listItemDelete);
    }
}
