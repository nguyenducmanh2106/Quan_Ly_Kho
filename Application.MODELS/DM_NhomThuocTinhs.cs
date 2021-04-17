using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_NhomThuocTinhs")]
    public class DM_NhomThuocTinhs
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Ordering { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public Nullable<int> Updated_By { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public int? KieuNhap { get; set; }
        public bool isRequired { get; set; }
        [NotMapped]
        public List<string> lstStringThuocTinhs { get; set; }
    }
}
