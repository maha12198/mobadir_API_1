using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public partial class File
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Column("name")]
        //[StringLength(50)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(50)")]
        public string? Name { get; set; }

        //[Column("file_url")]
        //[StringLength(100)]
        //[Unicode(false)]
        [Column(TypeName = "nvarchar(100)")]
        public string? FileUrl { get; set; }
        
        [Column("topic_id")]
        public int? TopicId { get; set; }

        [ForeignKey("TopicId")]
        [InverseProperty("Files")]
        public virtual Topic? Topic { get; set; }
    }
}
