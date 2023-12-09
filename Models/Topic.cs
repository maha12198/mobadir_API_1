using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class Topic
    {
        public Topic()
        {
            Files = new HashSet<File>();
            Questions = new HashSet<Question>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Column("title")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; } = null!;
        
        [Column("is_visible")]
        public bool? IsVisible { get; set; }
        
        [Column("updated_at", TypeName = "date")]
        public DateTime? UpdatedAt { get; set; }
        
        [Column("created_at", TypeName = "date")]
        public DateTime? CreatedAt { get; set; }
        
        //[Column("video_url")]
        [StringLength(200)]
        //[Unicode(false)]
        public string? VideoUrl { get; set; }
        
        //[Column("term")]
        public int? Term { get; set; }
        
        [Column("subject_id")]
        public int? SubjectId { get; set; }
        
        [Column("created_by")]
        public int? CreatedBy { get; set; }
        
        [Column("content_id")]
        public int? ContentId { get; set; }

        [ForeignKey("ContentId")]
        [InverseProperty("Topics")]
        public virtual TopicContent? Content { get; set; }
        
        [ForeignKey("CreatedBy")]
        [InverseProperty("Topics")]
        public virtual User? CreatedByNavigation { get; set; }
        
        [ForeignKey("SubjectId")]
        [InverseProperty("Topics")]
        public virtual Subject? Subject { get; set; }
        
        //[ForeignKey("Term")]
        //[InverseProperty("Topics")]
        //public virtual LookupValue? TermNavigation { get; set; }
        
        [InverseProperty("Topic")]
        public virtual ICollection<File> Files { get; set; }
        
        [InverseProperty("Topic")]
        public virtual ICollection<Question> Questions { get; set; }
    }
}
