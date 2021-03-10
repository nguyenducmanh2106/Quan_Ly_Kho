using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("Permissions")]
    public class Permissions
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int Ordering { get; set; }
        public int Status { get; set; }
        public Nullable<int> MenuId { get; set; }
        [NotMapped]
        public string MenuName { get; set; }
    }
}
