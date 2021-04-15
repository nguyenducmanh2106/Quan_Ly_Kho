using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_NhaCungCaps")]
    public class DM_NhaCungCaps
    {
        [Key]
        [Required]
        [Column("Id")]
        public int Id { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("Code")]
        public string Code { get; set; }
        [Column("Phone")]
        public string Phone { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("Address")]
        public string Address { get; set; }
        [Column("MaSoThue")]
        public string MaSoThue { get; set; }
        [Column("TenNguoiDaiDien")]
        public string TenNguoiDaiDien { get; set; }
        [Column("SDTNguoiDaiDien")]
        public string SDTNguoiDaiDien { get; set; }
        [Column("DiaChiNguoiDaiDien")]
        public string DiaChiNguoiDaiDien { get; set; }
        [Column("TenNganHang")]
        public string TenNganHang { get; set; }
        [Column("ChiNhanhNH")]
        public string ChiNhanhNH { get; set; }
        [Column("STKNganHang")]
        public string STKNganHang { get; set; }
        [Column("TenChuTKNganHang")]
        public string TenChuTKNganHang { get; set; }
        [Column("GhiChu")]
        public string GhiChu { get; set; }
        [Column("Status")]
        public int Status { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int? Updated_By { get; set; }

    }
}
