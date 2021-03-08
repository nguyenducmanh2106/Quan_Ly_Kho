using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("User_DonVi")]
    public class User_DonVis
    {
        [Key]
        public int Id { get; set; }
        public int Parent_Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public int Status { get; set; }

    }
}
