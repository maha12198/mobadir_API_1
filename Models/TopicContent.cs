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

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("content", TypeName = "text")]
        public string? Content { get; set; }

        // changed
        [Column("topic_id")]
        public int? TopicId { get; set; }

        // changed
        [ForeignKey("TopicId")]
        [InverseProperty("Content")]
        public virtual Topic? Topic { get; set; }

    }
}
