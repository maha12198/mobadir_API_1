﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mobadir_API_1.Models;

#nullable disable

namespace mobadir_API_1.Migrations
{
    [DbContext(typeof(Mobadr_DbContext))]
    [Migration("20240102202811_change-answer-type-to-int")]
    partial class changeanswertypetoint
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.24")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("mobadir_API_1.Models.ContactInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PhoneNo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("contact_info");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@gmail.com",
                            PhoneNo = 100020000
                        });
                });

            modelBuilder.Entity("mobadir_API_1.Models.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FileExtension")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("TopicId")
                        .HasColumnType("int")
                        .HasColumnName("topic_id");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Files");
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

                    b.Property<string>("image_url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Grades");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsVisible = true,
                            Name = "الصف الأول",
                            image_url = "numbers/1.jpg"
                        },
                        new
                        {
                            Id = 2,
                            IsVisible = true,
                            Name = "الصف الثاني",
                            image_url = "numbers/2.jpg"
                        },
                        new
                        {
                            Id = 3,
                            IsVisible = true,
                            Name = "الصف الثالث",
                            image_url = "numbers/3.jpg"
                        },
                        new
                        {
                            Id = 4,
                            IsVisible = true,
                            Name = "الصف الرابع",
                            image_url = "numbers/4.jpg"
                        },
                        new
                        {
                            Id = 5,
                            IsVisible = true,
                            Name = "الصف الخامس",
                            image_url = "numbers/5.jpg"
                        },
                        new
                        {
                            Id = 6,
                            IsVisible = true,
                            Name = "الصف السادس",
                            image_url = "numbers/6.jpg"
                        },
                        new
                        {
                            Id = 7,
                            IsVisible = true,
                            Name = "الصف السابع",
                            image_url = "numbers/7.jpg"
                        },
                        new
                        {
                            Id = 8,
                            IsVisible = true,
                            Name = "الصف الثامن",
                            image_url = "numbers/8.jpg"
                        },
                        new
                        {
                            Id = 9,
                            IsVisible = true,
                            Name = "الصف التاسع",
                            image_url = "numbers/9.jpg"
                        },
                        new
                        {
                            Id = 10,
                            IsVisible = true,
                            Name = "الصف العاشر",
                            image_url = "numbers/10.jpg"
                        },
                        new
                        {
                            Id = 11,
                            IsVisible = true,
                            Name = "الصف الحادي عشر",
                            image_url = "numbers/11.jpg"
                        },
                        new
                        {
                            Id = 12,
                            IsVisible = true,
                            Name = "الصف الثاني عشر",
                            image_url = "numbers/12.jpg"
                        });
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

                    b.ToTable("lookups");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LookupName = "user_role"
                        });
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

                    b.ToTable("lookup_values");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LookupId = 1,
                            LookupValueName = "مدير"
                        },
                        new
                        {
                            Id = 2,
                            LookupId = 1,
                            LookupValueName = "مشرف"
                        });
                });

            modelBuilder.Entity("mobadir_API_1.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("Answer")
                        .HasColumnType("int");

                    b.Property<string>("Choice1")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Choice2")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Choice3")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Choice4")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("image_url");

                    b.Property<string>("QuestionText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TopicId")
                        .HasColumnType("int")
                        .HasColumnName("topic_id");

                    b.HasKey("Id");

                    b.HasIndex("TopicId");

                    b.ToTable("Questions");
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

                    b.ToTable("Subjects");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            GradeId = 1,
                            IsVisible = true,
                            Name = "مادة الرياضيات"
                        },
                        new
                        {
                            Id = 2,
                            GradeId = 1,
                            IsVisible = true,
                            Name = "مادة العلوم"
                        },
                        new
                        {
                            Id = 3,
                            GradeId = 1,
                            IsVisible = true,
                            Name = "مادة اللغة العربية"
                        },
                        new
                        {
                            Id = 4,
                            GradeId = 2,
                            IsVisible = true,
                            Name = "مادة الرياضيات"
                        },
                        new
                        {
                            Id = 5,
                            GradeId = 2,
                            IsVisible = true,
                            Name = "مادة اللغة الانجليزية"
                        },
                        new
                        {
                            Id = 6,
                            GradeId = 3,
                            IsVisible = true,
                            Name = "مادة اللغة العربية"
                        },
                        new
                        {
                            Id = 7,
                            GradeId = 4,
                            IsVisible = true,
                            Name = "مادة الرياضيات"
                        },
                        new
                        {
                            Id = 8,
                            GradeId = 5,
                            IsVisible = true,
                            Name = "مادة العلوم"
                        },
                        new
                        {
                            Id = 9,
                            GradeId = 6,
                            IsVisible = true,
                            Name = "مادة اللغة الانجليزية"
                        },
                        new
                        {
                            Id = 10,
                            GradeId = 6,
                            IsVisible = true,
                            Name = "مادة الرياضيات"
                        });
                });

            modelBuilder.Entity("mobadir_API_1.Models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
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
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_at");

                    b.Property<string>("VideoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedBy");

                    b.HasIndex("SubjectId");

                    b.ToTable("Topics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7576),
                            CreatedBy = 1,
                            IsVisible = true,
                            SubjectId = 1,
                            Term = 1,
                            Title = "درس1"
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7610),
                            CreatedBy = 1,
                            IsVisible = true,
                            SubjectId = 1,
                            Term = 2,
                            Title = "درس2"
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7613),
                            CreatedBy = 1,
                            IsVisible = true,
                            SubjectId = 6,
                            Term = 1,
                            Title = "درس3"
                        },
                        new
                        {
                            Id = 4,
                            CreatedAt = new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7615),
                            CreatedBy = 1,
                            IsVisible = true,
                            SubjectId = 6,
                            Term = 2,
                            Title = "درس4"
                        });
                });

            modelBuilder.Entity("mobadir_API_1.Models.TopicContent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("content");

                    b.Property<int?>("TopicId")
                        .HasColumnType("int")
                        .HasColumnName("topic_id");

                    b.HasKey("Id");

                    b.HasIndex("TopicId")
                        .IsUnique()
                        .HasFilter("[topic_id] IS NOT NULL");

                    b.ToTable("topic_content");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Content = "content ex 1",
                            TopicId = 1
                        },
                        new
                        {
                            Id = 2,
                            Content = "content ex 2",
                            TopicId = 2
                        },
                        new
                        {
                            Id = 3,
                            Content = "content ex 3",
                            TopicId = 3
                        },
                        new
                        {
                            Id = 4,
                            Content = "content ex 4",
                            TopicId = 4
                        });
                });

            modelBuilder.Entity("mobadir_API_1.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("LastVisited")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_at");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Password = "2fgaPCZ6OmgiQLFYSSpLRAX+5byS3U/ryK6eXSBmtQHYAnu6",
                            Role = 1,
                            Username = "admin"
                        });
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
                    b.HasOne("mobadir_API_1.Models.User", "CreatedByNavigation")
                        .WithMany("Topics")
                        .HasForeignKey("CreatedBy")
                        .HasConstraintName("FK__Topics__created___4CA06362");

                    b.HasOne("mobadir_API_1.Models.Subject", "Subject")
                        .WithMany("Topics")
                        .HasForeignKey("SubjectId")
                        .HasConstraintName("FK__Topics__subject___4BAC3F29");

                    b.Navigation("CreatedByNavigation");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("mobadir_API_1.Models.TopicContent", b =>
                {
                    b.HasOne("mobadir_API_1.Models.Topic", "Topic")
                        .WithOne("Content")
                        .HasForeignKey("mobadir_API_1.Models.TopicContent", "TopicId");

                    b.Navigation("Topic");
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
                    b.Navigation("Content");

                    b.Navigation("Files");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("mobadir_API_1.Models.User", b =>
                {
                    b.Navigation("Topics");
                });
#pragma warning restore 612, 618
        }
    }
}
