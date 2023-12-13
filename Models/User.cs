using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    //map the Role property to a corresponding string representation when accessing it in your API controller
    public enum UserRole
    {
        مدير = 1,
        مشرف = 2
    }

    public partial class User
    {
        public User()
        {
            Topics = new HashSet<Topic>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Password { get; set; } = null!;
        
        [Column(TypeName = "nvarchar(50)")]
        public string Username { get; set; } = null!;
        
        public int Role { get; set; }

        [NotMapped] // This property won't be mapped to the database
        public UserRole UserRole
        {
            get => (UserRole)Role;
            set => Role = (int)value;
        } // access it using => user.UserRole.ToString();

        [Column("updated_at", TypeName = "date")]
        public DateTime? UpdatedAt { get; set; }

        //new 
        public string? Token { get; set; } = null!;

        //new
        public DateTime? LastVisited { get; set; }

        [InverseProperty("CreatedByNavigation")]
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
