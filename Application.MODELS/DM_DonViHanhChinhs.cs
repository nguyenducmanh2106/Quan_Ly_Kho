using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_DonViHanhChinhs")]
    public class DM_DonViHanhChinhs
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public int Ordering { get; set; }
        public int Status { get; set; }
        public string Code { get; set; }
        public DateTime? Updated_At { get; set; }
        public DateTime Created_At { get; set; }
        [NotMapped]
        public int Level { get; set; }
    }
}
