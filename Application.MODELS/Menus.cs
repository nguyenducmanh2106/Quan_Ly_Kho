using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Linq;

namespace Application.MODELS
{
    [Table("Menus")]
    public class Menus
    {
        [Key]
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Ordering { get; set; }
        public bool isMenu { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public int Status { get; set; }
        public string Icon { get; set; }
        [NotMapped]
        public int Level { get; set; }

        [NotMapped]
        public List<Menus> childNode { get; set; }
       
    }
}
