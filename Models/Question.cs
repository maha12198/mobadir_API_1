using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? QuestionText { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? Choice1 { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? Choice2 { get; set; }
        

        [Column(TypeName = "nvarchar(100)")]
        public string? Choice3 { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? Choice4 { get; set; }

        //[Column(TypeName = "nvarchar(50)")]
        public int? Answer { get; set; } // changed to int


        [Column("image_url", TypeName = "nvarchar(max)")]
        public string? ImageUrl { get; set; }
        


        [Column("topic_id")]
        public int? TopicId { get; set; }

        [ForeignKey("TopicId")]
        [InverseProperty("Questions")]
        public virtual Topic? Topic { get; set; }
    }
}
