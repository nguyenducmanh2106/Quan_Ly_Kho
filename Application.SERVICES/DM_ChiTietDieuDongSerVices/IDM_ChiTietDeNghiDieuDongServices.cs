using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_ChiTietDeNghiDieuDongSerVices

{
    public interface IDM_ChiTietDeNghiDieuDongServices
    {
        Task CreateOrUpdate(DM_ChiTietDeNghiDieuDongs obj);
        Task DeleteByID_DeNghiDieuDong(int ID_DeNghiDieuDong);
        Task BulkDeleteByID_DeNghiDieuDong(string listItemDelete);
        List<DM_ChiTietDeNghiDieuDongs> GetAllDataByID_DeNghiDieuDong(int ID_DeNghiDieuDong);
    }
}
