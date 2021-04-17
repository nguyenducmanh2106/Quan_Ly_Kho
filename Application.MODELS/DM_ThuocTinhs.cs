using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_ThuocTinhs")]
    public class DM_ThuocTinhs
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Ordering { get; set; }
        public DateTime Created_At { get; set; }
        public int Created_By { get; set; }
        [Column("NhomThuocTinh_Id")]
        public int? NhomThuocTinh_Id { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }

    }
}
