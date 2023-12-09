using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class Subject
    {
        public Subject()
        {
            Topics = new HashSet<Topic>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Column("name")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = null!;
        
        //[Column("is_visible")]
        public bool? IsVisible { get; set; }
        
        [Column("grade_id")]
        public int? GradeId { get; set; }

        [ForeignKey("GradeId")]
        [InverseProperty("Subjects")]
        public virtual Grade? Grade { get; set; }
        
        [InverseProperty("Subject")]
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
