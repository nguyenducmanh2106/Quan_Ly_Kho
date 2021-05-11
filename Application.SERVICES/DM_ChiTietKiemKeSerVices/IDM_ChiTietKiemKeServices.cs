using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ChiTietKiemKeSerVices

{
    public interface IDM_ChiTietKiemKeServices
    {
        Task KiemHang(List<DM_ChiTietKiemKes> obj);
        Task TaoPhieu(List<DM_ChiTietKiemKes> obj);
        Task DeleteByID_KiemKe(string ID_KiemKe);
        Task BulkDeleteByID_KiemKe(string listItemDelete);
        List<DM_ChiTietKiemKes> GetAllDataByID_KiemKe(string ID_KiemKe);
    }
}
