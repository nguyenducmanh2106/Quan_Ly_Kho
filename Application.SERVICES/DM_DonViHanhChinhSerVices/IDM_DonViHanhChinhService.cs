using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_DonViHanhChinhSerVices
{
    public interface IDM_DonViHanhChinhService
    {

        Task<IQueryable<DM_DonViHanhChinhs>> getData(int page, int pageSize, int Status, string Name, string nameSort = "");

        Task<IQueryable<DM_DonViHanhChinhs>> GetOptions(int Status, string Name);
        Task<IQueryable<DM_DonViHanhChinhs>> GetDonViHanhChinh(int ParentId);
        Task Create(DM_DonViHanhChinhs obj);
        Task Update(DM_DonViHanhChinhs obj);
        Task ToggleStatus(DM_DonViHanhChinhs obj);
        Task Delete(DM_DonViHanhChinhs obj);
        Task MultiDelete(string listItemDelete);
    }
}
