using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Linq;
namespace Application.MODELS
{
    [Table("DM_DeNghiDieuDongs")]
    public class DM_DeNghiDieuDongs
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Column("Code")]
        public string Code { get; set; }
        [Column("Created_At")]
        public DateTime Created_At { get; set; }
        [Column("Updated_At")]
        public DateTime? Updated_At { get; set; }
        [Column("Created_By")]
        public int Created_By { get; set; }
        [Column("Updated_By")]
        public int? Updated_By { get; set; }
        [Column("NgayDuyet")]
        public DateTime? NgayDuyet { get; set; }
        [Column("TaiKhoanDuyet")]
        public int? TaiKhoanDuyet { get; set; }
        [Column("Status")]
        public int? Status { get; set; }
        [Column("LoaiDeNghi_Id")]
        public int? LoaiDeNghi_Id { get; set; }
        [Column("LyDoTuChoi")]
        public string LyDoTuChoi { get; set; }
        [Column("ID_ChiNhanhGui")]
        public int? ID_ChiNhanhGui { get; set; }
        [Column("ID_ChiNhanhNhan")]
        public int? ID_ChiNhanhNhan { get; set; }
        [Column("ID_BoPhanGui")]
        public int? ID_BoPhanGui { get; set; }
        [Column("ID_BoPhanNhan")]
        public int? ID_BoPhanNhan { get; set; }
        [Column("ThoiGianGuiSanPham")]
        public DateTime? ThoiGianGuiSanPham { get; set; }
        [Column("NgayNhanSanPham")]
        public DateTime? NgayNhanSanPham { get; set; }
        [Column("Description")]
        public string Description { get; set; }
        [NotMapped]
        public string tenLoaiDeNghi { get; set; }
        [NotMapped]
        public string tenChiNhanhGui { get; set; }
        [NotMapped]
        public string tenChiNhanhNhan { get; set; }
        [NotMapped]
        public string tenNguoiGui { get; set; }
        [NotMapped]
        public string tenNguoiDuyet { get; set; }
        [NotMapped]
        public string tenBoPhanGui { get; set; }
        [NotMapped]
        public List<DM_ChiTietDeNghiDieuDongs> ChiTietDeNghiDieuDongs { get; set; }
        [NotMapped]
        public List<ChiTietKhos> ChiTietKhos { get; set; }
    }
}
