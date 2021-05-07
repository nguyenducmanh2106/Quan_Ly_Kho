using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_XuatHangs")]
    public class DM_XuatHangs
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int? Updated_By { get; set; }
        public DateTime? NgayDuyet { get; set; }
        public int? TaiKhoanDuyet { get; set; }
        [Column("Status")]
        [Description("0-Đơn trả hàng,1-Duyệt, 2-Xuất kho,3-Hoàn thành,4-Huỷ đơn")]
        public int? Status { get; set; }
        public string Description { get; set; }
        public decimal? ChietKhau { get; set; }
        [NotMapped]
        public string strNgayHenGiao { get; set; }
        public DateTime? NgayHenGiao { get; set; }
        public DateTime? NgayXuatKho { get; set; }
        public DateTime? NgayHoanThanh { get; set; }
        public DateTime? NgayHuyDon { get; set; }
        public decimal? TongTienPhaiTra { get; set; }
        public int? ID_NhaCungCap { get; set; }
        public int? ID_ChiNhanhNhan { get; set; }
        public int? TongSoLuong { get; set; }
        public decimal? TongTien { get; set; }
        public int? LoaiXuatHang { get; set; }
        public string KhachHang { get; set; }
        public string SdtKhachHang { get; set; }
        [NotMapped]
        public string tenChiNhanhNhan { get; set; }
        [NotMapped]
        public string tenNguoiDuyet { get; set; }
        [NotMapped]
        public string tenNhaCungCap { get; set; }
        [NotMapped]
        public string tenNguoiTao { get; set; }
        [NotMapped]
        public List<DM_ChiTietXuatHangs> ChiTietXuatHangs { get; set; }
        [NotMapped]
        public DM_NhaCungCaps nhaCungCaps { get; set; }
        [NotMapped]
        public decimal TongDaThanhToan { get; set; }
        [NotMapped]
        public List<ChiTietKhos> ChiTietKho { get; set; }
    }
}
