using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class Grade
    {
        public Grade()
        {
            Subjects = new HashSet<Subject>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        //[Column("is_visible")]
        public bool? IsVisible { get; set; }

        //[Column("name")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = null!;

        [InverseProperty("Grade")]
        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
