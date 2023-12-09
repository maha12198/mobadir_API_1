using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    [Keyless]
    [Table("contact_info")]
    public partial class ContactInfo
    {
        //[Column("phone_no")]
        public int? PhoneNo { get; set; }

        //[Column("email")]
        //[StringLength(50)]
        //[Unicode(false)]
        public string? Email { get; set; }
    }
}
