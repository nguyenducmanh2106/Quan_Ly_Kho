using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class SanPhamFilterModel
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public string Name { get; set; } = "";
        public string NgayTao { get; set; } = "";
        public int TypeFilterNgayTao { get; set; } = -1;
        public int ThuongHieu_Id { get; set; } = -1;
        public int XuatXu_Id { get; set; } = -1;
        public int LoaiSP { get; set; } = -1;
        public int Status { get; set; } = -1;
        public string nameSort { get; set; } = "";
    }
}
