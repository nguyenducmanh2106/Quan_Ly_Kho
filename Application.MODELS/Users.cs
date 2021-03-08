﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.MODELS
{
    [Table("Users")]
   public class Users
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string Avatar { get; set; }
        public string FullName { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public int Status { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? DonViId { get; set; }
        public int? ChucVuId { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? LastChangePass { get; set; }
        public int? Ordering { get; set; }
    }
}
