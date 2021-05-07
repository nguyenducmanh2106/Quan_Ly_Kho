using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_NhapHangs")]
    public class DM_NhapHangs
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
        [Description("0-Đặt hàng,1-Duyệt, 2-Nhập kho,3-Hoàn thành,4-Huỷ đơn")]
        public int? Status { get; set; }
        public string Description { get; set; }
        [Column("ThanhToan")]
        [Description("1-Đã thanh toán, 2-Chưa thanh toán, 3-Thanh toán một phần,4-Hoàn tiền một phần,5-Hoàn tiền toàn bộ")]
        public int? ThanhToan { get; set; }
        [Column("NhapKho")]
        [Description("1-Chờ Nhập hàng,2-Đã Nhập Hàng,3-Hoàn trả một phần,4-hoàn trả toàn bộ")]
        public int? NhapKho { get; set; }
        public decimal? ChietKhau { get; set; }
        [NotMapped]
        public string strNgayHenGiao { get; set; }
        public DateTime? NgayHenGiao { get; set; }
        public DateTime? NgayNhapKho { get; set; }
        public DateTime? NgayHoanThanh { get; set; }
        public DateTime? NgayHuyDon { get; set; }
        public decimal? TongTienPhaiTra { get; set; }
        public int? ID_NhaCungCap { get; set; }
        public int? ID_ChiNhanhNhan { get; set; }
        public int? TongSoLuong { get; set; }
        public decimal? TongTien { get; set; }
        [NotMapped]
        public string tenChiNhanhNhan { get; set; }
        [NotMapped]
        public string tenNguoiDuyet { get; set; }
        [NotMapped]
        public string tenNhaCungCap { get; set; }
        [NotMapped]
        public string tenNguoiTao { get; set; }
        [NotMapped]
        public List<DM_ChiTietNhapHangs> ChiTietNhapHangs { get; set; }
        [NotMapped]
        public List<ThanhToanDonHangs> ThanhToanDonHangs { get; set; }
        [NotMapped]
        public ThanhToanDonHangs ThanhToanDonHang { get; set; }
        [NotMapped]
        public DM_NhaCungCaps nhaCungCaps { get; set; }
        [NotMapped]
        public decimal TongDaThanhToan { get; set; }
        [NotMapped]
        public List<ChiTietKhos> ChiTietKho { get; set; }
    }
}
