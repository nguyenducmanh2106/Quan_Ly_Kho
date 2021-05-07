using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class DM_XuatHangFilterModel
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public string Name { get; set; } = "";
        public string NgayTao { get; set; } = "";
        public string NgayDuyet { get; set; } = "";
        public string NgayXuatKho { get; set; } = "";
        public string NgayHenGiao { get; set; } = "";
        public int TypeFilterNgayHenGiao { get; set; } = -1;
        public int TypeFilterNgayTao { get; set; } = -1;
        public int TypeFilterNgayDuyet { get; set; } = -1;
        public int TypeFilterNgayXuatKho { get; set; } = -1;
        public int ID_ChiNhanhNhan { get; set; } = -1;
        public int Status { get; set; } = -1;
        public string nameSort { get; set; } = "";
    }
}
