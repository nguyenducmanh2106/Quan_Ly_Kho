using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_DonViTinhSerVices

{
    public interface IDM_DonViTinhServices
    {

        Task<IQueryable<DM_DonViTinhs>> getData(int page, int pageSize, int Status, string Name, string nameSort = "");

        Task<IQueryable<DM_DonViTinhs>> GetOptions(int Status, string Name);
        Task Create(DM_DonViTinhs obj);
        Task Update(DM_DonViTinhs obj);
        Task ToggleStatus(DM_DonViTinhs obj);
        Task Delete(DM_DonViTinhs obj);
        Task MultiDelete(string listItemDelete);
    }
}
