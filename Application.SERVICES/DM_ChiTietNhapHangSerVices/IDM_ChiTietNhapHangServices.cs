using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ChiTietNhapHangSerVices

{
    public interface IDM_ChiTietNhapHangServices
    {
        Task Update(DM_ChiTietNhapHangs obj);
        Task BulkInsert(List<DM_ChiTietNhapHangs> obj);
        Task DeleteByID_NhapHang(string ID_NhapHang);
        Task BulkDeleteByID_NhapHang(string listItemDelete);
        List<DM_ChiTietNhapHangs> GetAllDataByID_NhapHang(string ID_NhapHang, int Id_Kho);
    }
}
