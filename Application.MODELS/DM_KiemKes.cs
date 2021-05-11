using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_KiemKes")]
    public class DM_KiemKes
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime Created_At { get; set; }
        public int? Created_By { get; set; }
        [Description("0-Lên danh sách(Đang kiểm kho),1-Kiểm hàng(Đã kiểm kho), 2-Câng bằng kho,3-Hoàn thành,4-Huỷ")]
        public int? Status { get; set; }
        public int? NhanVienKiem { get; set; }
        public int? Id_ChiNhanh { get; set; }
        public DateTime? NgayKiem { get; set; }
        public int? NhanVienCanBang { get; set; }
        public DateTime? NgayCanBang { get; set; }
        public DateTime? NgayHoanThanh { get; set; }
        public string GhiChu { get; set; }
        [NotMapped]
        public string tenChiNhanh { get; set; }
        [NotMapped]
        public string tenNguoiTao { get; set; }
        [NotMapped]
        public string tenNguoiCanBang { get; set; }
        [NotMapped]
        public string tenNguoiKiem { get; set; }
        [NotMapped]
        public List<DM_ChiTietKiemKes> ChiTietKiemKes { get; set; }
        [NotMapped]
        public List<ChiTietKhos> ChiTietKho { get; set; }
    }
}
