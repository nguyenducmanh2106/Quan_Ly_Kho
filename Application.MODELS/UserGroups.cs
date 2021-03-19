using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("UserGroups")]
    public class UserGroups
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Ordering { get; set; }
        public int Status { get; set; }
        public DateTime Created_At { get; set; }
        public string Permission { get; set; }
    }
}
