﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mobadir_API_1.Models;

#nullable disable

namespace mobadir_API_1.Migrations
{
    [DbContext(typeof(Mobadr_DbContext))]
    partial class Mobadr_DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.24")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("mobadir_API_1.Models.ContactInfo", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PhoneNo")
                        .HasColumnType("int");

                    b.ToTable("contact_info", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FileUrl")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("TopicId")
                        .HasColumnType("int")
                        .HasColumnName("topic_id");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Files", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.Grade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool?>("IsVisible")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Grades", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.Lookup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("LookupName")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("lookups", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.LookupValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("LookupId")
                        .HasColumnType("int")
                        .HasColumnName("lookup_id");

                    b.Property<string>("LookupValueName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("LookupId");

                    b.ToTable("lookup_values", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Choice1")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Choice2")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Choice3")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Choice4")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("image_url");

                    b.Property<string>("QuestionText")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("TopicId")
                        .HasColumnType("int")
                        .HasColumnName("topic_id");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Questions", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("GradeId")
                        .HasColumnType("int")
                        .HasColumnName("grade_id");

                    b.Property<bool?>("IsVisible")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("GradeId");

                    b.ToTable("Subjects", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("ContentId")
                        .HasColumnType("int")
                        .HasColumnName("content_id");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("date")
                        .HasColumnName("created_at");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("created_by");

                    b.Property<bool?>("IsVisible")
                        .HasColumnType("bit")
                        .HasColumnName("is_visible");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int")
                        .HasColumnName("subject_id");

                    b.Property<int?>("Term")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("date")
                        .HasColumnName("updated_at");

                    b.Property<string>("VideoUrl")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("ContentId");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("SubjectId");

                    b.ToTable("Topics", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.TopicContent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.HasKey("Id");

                    b.ToTable("topic_content", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("date")
                        .HasColumnName("updated_at");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("mobadir_API_1.Models.File", b =>
                {
                    b.HasOne("mobadir_API_1.Models.Topic", "Topic")
                        .WithMany("Files")
                        .HasForeignKey("TopicId")
                        .HasConstraintName("FK__Files__topic_id__534D60F1");

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("mobadir_API_1.Models.LookupValue", b =>
                {
                    b.HasOne("mobadir_API_1.Models.Lookup", "Lookup")
                        .WithMany("LookupValues")
                        .HasForeignKey("LookupId")
                        .HasConstraintName("FK__lookup_va__looku__3F466844");

                    b.Navigation("Lookup");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Question", b =>
                {
                    b.HasOne("mobadir_API_1.Models.Topic", "Topic")
                        .WithMany("Questions")
                        .HasForeignKey("TopicId")
                        .HasConstraintName("FK__Questions__topic__5070F446");

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Subject", b =>
                {
                    b.HasOne("mobadir_API_1.Models.Grade", "Grade")
                        .WithMany("Subjects")
                        .HasForeignKey("GradeId")
                        .HasConstraintName("FK__Subjects__grade___3A81B327");

                    b.Navigation("Grade");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Topic", b =>
                {
                    b.HasOne("mobadir_API_1.Models.TopicContent", "Content")
                        .WithMany("Topics")
                        .HasForeignKey("ContentId")
                        .HasConstraintName("FK__Topics__content___4D94879B");

                    b.HasOne("mobadir_API_1.Models.User", "CreatedByNavigation")
                        .WithMany("Topics")
                        .HasForeignKey("CreatedBy")
                        .HasConstraintName("FK__Topics__created___4CA06362");

                    b.HasOne("mobadir_API_1.Models.Subject", "Subject")
                        .WithMany("Topics")
                        .HasForeignKey("SubjectId")
                        .HasConstraintName("FK__Topics__subject___4BAC3F29");

                    b.Navigation("Content");

                    b.Navigation("CreatedByNavigation");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Grade", b =>
                {
                    b.Navigation("Subjects");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Lookup", b =>
                {
                    b.Navigation("LookupValues");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Subject", b =>
                {
                    b.Navigation("Topics");
                });

            modelBuilder.Entity("mobadir_API_1.Models.Topic", b =>
                {
                    b.Navigation("Files");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("mobadir_API_1.Models.TopicContent", b =>
                {
                    b.Navigation("Topics");
                });

            modelBuilder.Entity("mobadir_API_1.Models.User", b =>
                {
                    b.Navigation("Topics");
                });
#pragma warning restore 612, 618
        }
    }
}
