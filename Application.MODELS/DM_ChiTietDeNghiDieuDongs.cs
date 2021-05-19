using Application.UTILS;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ChiTietDeNghiDieuDongs")]
    public class DM_ChiTietDeNghiDieuDongs
    {

        [Key]
        [Required]
        [Column("Id")]
        public int id { get; set; }
        [Column("ID_DeNghiDieuDong")]
        public string ID_DeNghiDieuDong { get; set; }
        [Column("ID_SanPham")]
        public string ID_SanPham { get; set; }
        [Column("SoLuongYeuCau")]
        public int SoLuongYeuCau { get; set; }
        [Column("SoLuongDuyet")]
        public int SoLuongDuyet { get; set; }
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
        public int SoLuongTrongKho { get; set; }
        [NotMapped]
        public int SoLuongCoTheXuat { get; set; }

    }
}
