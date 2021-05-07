using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ChiTietXuatHangSerVices

{
    public interface IDM_ChiTietXuatHangServices
    {
        Task Update(DM_ChiTietXuatHangs obj);
        Task BulkInsert(List<DM_ChiTietXuatHangs> obj);
        Task DeleteByID_XuatHang(string ID_NhapHang);
        Task BulkDeleteByID_XuatHang(string listItemDelete);
        List<DM_ChiTietXuatHangs> GetAllDataByID_XuatHang(string ID_XuatHang);
    }
}
