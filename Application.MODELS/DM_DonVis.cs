using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("DM_DonVis")]
    public class DM_DonVis
    {
        [Key]
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public int Status { get; set; }
        public int Ordering { get; set; }
        public int? TinhId { get; set; }
        public int? HuyenId { get; set; }
        public int? XaId { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public int? CapDo { get; set; }
        [NotMapped]
        public int Level { get; set; }
        [NotMapped]
        public string tenTinh { get; set; }
        [NotMapped]
        public string tenHuyen { get; set; }
        [NotMapped]
        public string tenXa { get; set; }
    }
}
