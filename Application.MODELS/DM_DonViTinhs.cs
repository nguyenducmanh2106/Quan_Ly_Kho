using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_DonViTinhs")]
    public class DM_DonViTinhs
    {
        [Key]
        [Required]
        [Column("Id")]
        public int Id { get; set; }
        [Column("Ordering")]
        [Required]
        public int Ordering { get; set; }
        [Column("Description")]
        public string Description { get; set; }
        [Column("_Content")]
        public string Content { get; set; }
        [Column("Name")]
        [Required]
        public string Name { get; set; }
        [Column("Code")]
        [Required]
        public string Code { get; set; }
        [Column("Status")]
        [Required]
        public int Status { get; set; }
        [Column("Created_At")]
        [Required]
        public DateTime Created_At { get; set; }
        [Column("Updated_At")]
        public DateTime? Updated_At { get; set; }
        [Column("Created_By")]
        public int Created_By { get; set; }
        [Column("Updated_By")]
        public int Updated_By { get; set; }

    }
}
