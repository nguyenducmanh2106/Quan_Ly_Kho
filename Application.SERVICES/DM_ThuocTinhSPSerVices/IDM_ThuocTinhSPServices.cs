using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ThuocTinhSPSerVices

{
    public interface IDM_ThuocTinhSPServices
    {
        Task CreateOrUpdate(DM_ThuocTinhSPs obj);
        Task BulkUpdate(List<DM_ThuocTinhSPs> obj);
        Task DeleteBySanPham(string SanPhamId);
        Task BulkDeleteBySanPham(string listItemDelete);
        Task<List<DM_ThuocTinhSPs>> GetAllDataBySanPham(string SanPhamId);
    }
}
