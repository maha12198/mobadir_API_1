using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    [Table("topic_content")]
    public partial class TopicContent
    {
        public TopicContent()
        {
            Topics = new HashSet<Topic>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("content", TypeName = "text")]
        public string? Content { get; set; }

        [InverseProperty("Content")]
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
