using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("Roles")]
    public class Roles
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public int Status { get; set; }
        public int? MenuID { get; set; }
        [Description("Tên của quyền:update,delete,view,update")]
        public string Code { get; set; }

    }
}
