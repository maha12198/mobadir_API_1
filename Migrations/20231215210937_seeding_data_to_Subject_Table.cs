using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class seeding_data_to_Subject_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Subjects",
                columns: new[] { "Id", "grade_id", "IsVisible", "Name" },
                values: new object[,]
                {
                    { 1, 1, true, "مادة الرياضيات" },
                    { 2, 1, true, "مادة العلوم" },
                    { 3, 1, true, "مادة اللغة العربية" },
                    { 4, 2, true, "مادة الرياضيات" },
                    { 5, 2, true, "مادة اللغة الانجليزية" },
                    { 6, 3, true, "مادة اللغة العربية" },
                    { 7, 4, true, "مادة الرياضيات" },
                    { 8, 5, true, "مادة العلوم" },
                    { 9, 6, true, "مادة اللغة الانجليزية" },
                    { 10, 6, true, "مادة الرياضيات" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
