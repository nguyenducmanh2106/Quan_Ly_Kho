using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_SanPhams")]
    public class DM_SanPhams
    {
        [Key]
        [Required]
        [Column("Id")]
        public int Id { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("Code")]
        public string Code { get; set; }
        [Column("Barcode")]
        public string Barcode { get; set; }
        [Column("LoaiSP")]
        public int LoaiSP { get; set; }
        [Column("ThuongHieu_Id")]
        public int ThuongHieu_Id { get; set; }
        [Column("XuatXu_Id")]
        public int XuatXu_Id { get; set; }
        [Column("KhoiLuong")]
        public string KhoiLuong { get; set; }
        [Column("DonViTinh_Id")]
        public int DonViTinh_Id { get; set; }
        [Column("KichThuoc")]
        public string KichThuoc { get; set; }
        [Column("Avatar")]
        public string Avatar { get; set; }
        [Column("Status")]
        public int Status { get; set; }
        [Column("Created_At")]
        public DateTime Created_At { get; set; }
        [Column("Updated_At")]
        public DateTime? Updated_At { get; set; }
        [Column("Created_By")]
        public int Created_By { get; set; }
        [Column("Updated_By")]
        public int? Updated_By { get; set; }
        [Column("GiaNhap")]
        public decimal? GiaNhap { get; set; }
        [Column("GiaBanBuon")]
        public decimal? GiaBanBuon { get; set; }
        [Column("GiaBanLe")]
        public decimal? GiaBanLe { get; set; }
        [Column("GiaCu")]
        public decimal? GiaCu { get; set; }
        [Column("pathAvatar")]
        public string pathAvatar { get; set; }
        [NotMapped]
        public string File_Base64 { get; set; }
    }
}
