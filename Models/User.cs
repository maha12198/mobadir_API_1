using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class User
    {
        public User()
        {
            Topics = new HashSet<Topic>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Column("password")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string Password { get; set; } = null!;
        
        //[Column("username")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string Username { get; set; } = null!;
        
        //[Column("role")]
        public int Role { get; set; }
        
        [Column("updated_at", TypeName = "date")]
        public DateTime? UpdatedAt { get; set; }

        //new 
        public string? Token { get; set; } = null!;

        [InverseProperty("CreatedByNavigation")]
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
