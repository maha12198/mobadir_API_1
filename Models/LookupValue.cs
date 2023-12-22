using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    [Table("lookup_values")]
    public partial class LookupValue
    {
        public LookupValue()
        {
            
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public string? LookupValueName { get; set; }
        
        [Column("lookup_id")]
        public int? LookupId { get; set; }

        [ForeignKey("LookupId")]
        [InverseProperty("LookupValues")]
        public virtual Lookup? Lookup { get; set; }
        

    }
}
