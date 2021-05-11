using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class DM_KiemKeFilterModel
    {
        public int page { get; set; } = 1;
        public int pageSize { get; set; } = 10;
        public int? Status { get; set; } = -1;
        public string NgayTao { get; set; } = "";
        public int TypeFilterNgayTao { get; set; } = -1;
        public string NgayKiem { get; set; } = "";
        public int TypeFilterNgayKiem { get; set; } = -1;
        public int Id_ChiNhanh { get; set; } = -1;
    }
}
