using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class testnewdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contact_info",
                columns: table => new
                {
                    PhoneNo = table.Column<int>(type: "int", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsVisible = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "lookups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LookupName = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lookups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "topic_content",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_topic_content", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    updated_at = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: true),
                    grade_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Subjects__grade___3A81B327",
                        column: x => x.grade_id,
                        principalTable: "Grades",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "lookup_values",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LookupValueName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    lookup_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lookup_values", x => x.Id);
                    table.ForeignKey(
                        name: "FK__lookup_va__looku__3F466844",
                        column: x => x.lookup_id,
                        principalTable: "lookups",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    is_visible = table.Column<bool>(type: "bit", nullable: true),
                    updated_at = table.Column<DateTime>(type: "date", nullable: true),
                    created_at = table.Column<DateTime>(type: "date", nullable: true),
                    VideoUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Term = table.Column<int>(type: "int", nullable: true),
                    subject_id = table.Column<int>(type: "int", nullable: true),
                    created_by = table.Column<int>(type: "int", nullable: true),
                    content_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Topics__content___4D94879B",
                        column: x => x.content_id,
                        principalTable: "topic_content",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Topics__created___4CA06362",
                        column: x => x.created_by,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Topics__subject___4BAC3F29",
                        column: x => x.subject_id,
                        principalTable: "Subjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    topic_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Files__topic_id__534D60F1",
                        column: x => x.topic_id,
                        principalTable: "Topics",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Choice1 = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Choice2 = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Choice3 = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Choice4 = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Answer = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    image_url = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    topic_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Questions__topic__5070F446",
                        column: x => x.topic_id,
                        principalTable: "Topics",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Files_topic_id",
                table: "Files",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_lookup_values_lookup_id",
                table: "lookup_values",
                column: "lookup_id");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_topic_id",
                table: "Questions",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_grade_id",
                table: "Subjects",
                column: "grade_id");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_content_id",
                table: "Topics",
                column: "content_id");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_created_by",
                table: "Topics",
                column: "created_by");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_subject_id",
                table: "Topics",
                column: "subject_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contact_info");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "lookup_values");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "lookups");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropTable(
                name: "topic_content");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Grades");
        }
    }
}
