using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ChiTietXuatHangs")]
    public class DM_ChiTietXuatHangs
    {
        public int Id { get; set; }
        public string ID_DM_XuatHang { get; set; }
        public string ID_SanPham { get; set; }
        public int SoLuong { get; set; }
        public decimal? GiaXuat { get; set; }
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
