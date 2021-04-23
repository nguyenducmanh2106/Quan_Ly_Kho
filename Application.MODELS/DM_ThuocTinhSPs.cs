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
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int SanPhamId { get; set; }
    }
}
