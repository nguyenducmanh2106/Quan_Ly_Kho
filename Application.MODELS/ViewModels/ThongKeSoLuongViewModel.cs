using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class ThongKeSoLuongViewModel
    {
        public int CapDoDonVi { get; set; }
        public int Id_Kho { get; set; }=-1;
        public string tenKho { get; set; }
        public string MaSP { get; set; }
        public string tenSanPham { get; set; }
        public int SoLuongTon { get; set; }
        [Description("Số lượng đang chuyển kho")]
        public int SoLuongDangChuyenKho { get; set; }
        [Description("Với kho chi nhánh là đang giao cho khách hàng,kho tổng là đang chờ nhập của nhà cung cấp")]
        public int SoLuongDangXuat { get; set; }
        [Description("Số lượng đang chờ nhập từ kho khác")]
        public int SoLuongChoNhapHangKhoKhac { get; set; }
        public int SoLuongChoNhapHangNhaCungCap { get; set; }
        public int SoLuongThucTrongKho { get; set; }

    }
}
