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

        //[Column("question_text")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(100)")]
        public string? QuestionText { get; set; }

        //[Column("choice1")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Choice1 { get; set; }

        //[Column("choice2")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Choice2 { get; set; }
        
        //[Column("choice3")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Choice3 { get; set; }

        //[Column("choice4")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Choice4 { get; set; }

        //[Column("answer")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Answer { get; set; }
        
        //[Column("image_url")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column("image_url", TypeName = "nvarchar(100)")]
        public string? ImageUrl { get; set; }
        
        [Column("topic_id")]
        public int? TopicId { get; set; }

        [ForeignKey("TopicId")]
        [InverseProperty("Questions")]
        public virtual Topic? Topic { get; set; }
    }
}
