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
            //Topics = new HashSet<Topic>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Column("id")]
        public int Id { get; set; }

        //[Column("lookup_value_name")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(100)")]
        public string? LookupValueName { get; set; }
        
        [Column("lookup_id")]
        public int? LookupId { get; set; }

        [ForeignKey("LookupId")]
        [InverseProperty("LookupValues")]
        public virtual Lookup? Lookup { get; set; }
        
        //[InverseProperty("TermNavigation")]
        //public virtual ICollection<Topic> Topics { get; set; }
    }
}
