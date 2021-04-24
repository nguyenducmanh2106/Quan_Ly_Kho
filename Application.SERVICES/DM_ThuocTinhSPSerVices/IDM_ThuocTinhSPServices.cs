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
        Task DeleteBySanPham(int SanPhamId);
        Task BulkDeleteBySanPham(string listItemDelete);
        Task<List<DM_ThuocTinhSPs>> GetAllDataBySanPham(int SanPhamId);
    }
}
