using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("ThanhToanDonHangs")]
    public class ThanhToanDonHangs
    {
        [Key]
        public int Id { get; set; }
        public string ID_NhapHang { get; set; }
        public decimal? TongTienDaTra { get; set; }
        public int? NguoiThanhToan { get; set; }
        public DateTime? NgayThanhToan { get; set; }
        public int? HinhThucThanhToan { get; set; }
    }
}
