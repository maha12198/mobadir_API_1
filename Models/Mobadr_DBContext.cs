using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace mobadir_API_1.Models
{
    public partial class Mobadr_DbContext : DbContext
    {
        //public Mobadr_DbContext()
        //{
        //}

        public Mobadr_DbContext(DbContextOptions<Mobadr_DbContext> options): base(options)
        {
        }

        public virtual DbSet<ContactInfo> ContactInfos { get; set; } = null!;
        public virtual DbSet<File> Files { get; set; } = null!;
        public virtual DbSet<Grade> Grades { get; set; } = null!;
        public virtual DbSet<Lookup> Lookups { get; set; } = null!;
        public virtual DbSet<LookupValue> LookupValues { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Subject> Subjects { get; set; } = null!;
        public virtual DbSet<Topic> Topics { get; set; } = null!;
        public virtual DbSet<TopicContent> TopicContents { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Server=MAHA\\SQLEXPRESS01;Database=Mobadr_DB;Trusted_Connection=True;");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // new
            base.OnModelCreating(modelBuilder);
            new DbInitializer(modelBuilder).Seed();

            modelBuilder.Entity<File>(entity =>
            {
                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Files)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK__Files__topic_id__534D60F1");
            });

            modelBuilder.Entity<LookupValue>(entity =>
            {
                entity.HasOne(d => d.Lookup)
                    .WithMany(p => p.LookupValues)
                    .HasForeignKey(d => d.LookupId)
                    .HasConstraintName("FK__lookup_va__looku__3F466844");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK__Questions__topic__5070F446");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.HasOne(d => d.Grade)
                    .WithMany(p => p.Subjects)
                    .HasForeignKey(d => d.GradeId)
                    .HasConstraintName("FK__Subjects__grade___3A81B327");
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.HasOne(d => d.Content)
                    .WithMany(p => p.Topics)
                    .HasForeignKey(d => d.ContentId)
                    .HasConstraintName("FK__Topics__content___4D94879B");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Topics)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__Topics__created___4CA06362");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Topics)
                    .HasForeignKey(d => d.SubjectId)
                    .HasConstraintName("FK__Topics__subject___4BAC3F29");

                //entity.HasOne(d => d.TermNavigation)
                //    .WithMany(p => p.Topics)
                //    .HasForeignKey(d => d.Term)
                //    .HasConstraintName("FK__Topics__term__4AB81AF0");
            });


            //OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //}
    }
}
