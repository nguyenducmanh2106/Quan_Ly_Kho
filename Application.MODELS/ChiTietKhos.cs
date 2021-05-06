using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("ChiTietKhos")]
    public class ChiTietKhos
    {
        [Key]
        public int Id { get; set; }
        public int? Id_Kho { get; set; }
        public string Id_SanPham { get; set; }
        public int? SoLuong { get; set; }
    }
}
