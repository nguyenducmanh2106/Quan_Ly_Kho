using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ChiTietKiemKes")]
    public class DM_ChiTietKiemKes
    {
        public int Id { get; set; }
        public string ID_KiemKe { get; set; }
        public string ID_SanPham { get; set; }
        public int? TonChiNhanh { get; set; }
        public int? TonThucTe { get; set; }
        public string GhiChu { get; set; }
        public string LyDo { get; set; }
        [NotMapped]
        public string tenSanPham { get; set; }
        [NotMapped]
        public string code { get; set; }
        [NotMapped]
        public string barCode { get; set; }
        [NotMapped]
        public string tenDonViTinh { get; set; }
        [NotMapped]
        public dynamic imgSanPham { get; set; }
    }
}
