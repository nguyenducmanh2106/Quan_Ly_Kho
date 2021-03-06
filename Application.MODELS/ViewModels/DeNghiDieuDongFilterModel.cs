using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class DeNghiDieuDongFilterModel
    {
        public string TuNgay { get; set; } = "";
        public string DenNgay { get; set; } = "";
        public int GuiDenKho { get; set; } = -1;
        public int KhoYeuCau { get; set; }=-1;
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public string Name { get; set; } = "";
        public string NgayTao { get; set; } = "";
        public string NgayDuyet { get; set; } = "";
        public string NgayNhanSanPham { get; set; } = "";
        public string ThoiGianGuiSanPham { get; set; } = "";
        public int TypeFilterThoiGianGuiSanPham { get; set; } = -1;
        public int TypeFilterNgayTao { get; set; } = -1;
        public int TypeFilterNgayDuyet { get; set; } = -1;
        public int TypeFilterNgayNhanSanPham { get; set; } = -1;
        public int LoaiDeNghi_Id { get; set; } = -1;
        public int ID_ChiNhanhGui { get; set; } = -1;
        public int ID_ChiNhanhNhan { get; set; } = -1;
        public int Status { get; set; } = -1;
        public string nameSort { get; set; } = "";
    }
}
