using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ChiTietNhapHangs")]
    public class DM_ChiTietNhapHangs
    {
        public int Id { get; set; }
        public string ID_DM_NhapHang { get; set; }
        public string ID_SanPham { get; set; }
        public int SoLuong { get; set; }
        public decimal? GiaNhap { get; set; }
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
        [NotMapped]
        public int SoLuongCoTheXuat { get; set; }
        [NotMapped]
        public int SoLuongTrongKho { get; set; }
    }
}
