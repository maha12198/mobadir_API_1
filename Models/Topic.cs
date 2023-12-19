using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    //map the Term property to a corresponding string representation when accessing it in your API controller
    public enum TopicTerm
    {
        الأول = 1,
        الثاني = 2
    }

    public partial class Topic
    {
        public Topic()
        {
            Files = new HashSet<File>();
            Questions = new HashSet<Question>();

            // new
            //CreatedAt = DateTime.UtcNow.AddHours(4);
        }


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; } = null!;
        
        [Column("is_visible")]
        public bool? IsVisible { get; set; }
        
        [Column("updated_at", TypeName = "date")]
        public DateTime? UpdatedAt { get; set; }
        
        [Column("created_at", TypeName = "date")]
        public DateTime? CreatedAt { get; set; }
        
        [StringLength(200)]
        public string? VideoUrl { get; set; }

        public int? Term { get; set; }
        // This property won't be mapped to the database
        // access it using => user.TopicTerm.ToString();
        [NotMapped] 
        public TopicTerm TopicTerm
        {
            get => (TopicTerm) Term;
            set => Term = (int)value;
        } 

        [Column("subject_id")]
        public int? SubjectId { get; set; }
        
        [Column("created_by")]
        public int? CreatedBy { get; set; }
        
        //[Column("content_id")]
        //public int? ContentId { get; set; }
        //[ForeignKey("ContentId")]
        //[InverseProperty("Topics")]
        //public virtual TopicContent? Content { get; set; }
        




        [ForeignKey("CreatedBy")]
        [InverseProperty("Topics")]
        public virtual User? CreatedByNavigation { get; set; }
        
        [ForeignKey("SubjectId")]
        [InverseProperty("Topics")]
        public virtual Subject? Subject { get; set; }
        
        


        [InverseProperty("Topic")]
        public virtual ICollection<File> Files { get; set; }
        
        [InverseProperty("Topic")]
        public virtual ICollection<Question> Questions { get; set; }
        
        
        
        
        //[ForeignKey("Term")]
        //[InverseProperty("Topics")]
        //public virtual LookupValue? TermNavigation { get; set; }
    }
}
