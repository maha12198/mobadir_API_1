using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    [Table("lookups")]
    public partial class Lookup
    {
        public Lookup()
        {
            LookupValues = new HashSet<LookupValue>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Column("id")]
        public int Id { get; set; }
        
        //[Column("lookup_name")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? LookupName { get; set; }

        [InverseProperty("Lookup")]
        public virtual ICollection<LookupValue> LookupValues { get; set; }
    }
}
