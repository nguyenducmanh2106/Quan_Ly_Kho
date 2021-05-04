using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.ThanhToanDonHangSerVices
{
    public interface IThanhToanDonHangServices
    {
        List<ThanhToanDonHangs> GetAllDataActiveByID_NhapHang(string ID_NhapHang);
        Task Create(ThanhToanDonHangs obj);
        Task Update(ThanhToanDonHangs obj);
        Task DeleteByID_NhapHang(string ID_NhapHang);
        Task MultiDelete(string listItemDelete);
        decimal TongDaThanhToan(string ID_NhapHang);
    }
}
