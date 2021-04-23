using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ThuocTinhSPs")]
    public class DM_ThuocTinhSPs
    {
        [Key]
        [Required]
        [Column("Id")]
        public int id { get; set; }
        [Column("Name")]
        public string name { get; set; }
        [Column("Value")]
        public string value { get; set; }
        [Column("SanPhamId")]
        public int sanPhamId { get; set; }
    }
}
