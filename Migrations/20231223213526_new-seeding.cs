using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class newseeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.InsertData(
                table: "contact_info",
                columns: new[] { "Id", "Email", "PhoneNo" },
                values: new object[] { 1, "admin@gmail.com", 100020000 });

            migrationBuilder.InsertData(
                table: "lookups",
                columns: new[] { "Id", "LookupName" },
                values: new object[] { 1, "user_role" });

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 1,
                column: "content",
                value: "content ex 1");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 2,
                column: "content",
                value: "content ex 2");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 3,
                column: "content",
                value: "content ex 3");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 4,
                column: "content",
                value: "content ex 4");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "created_at", "created_by" },
                values: new object[] { new DateTime(2023, 12, 23, 23, 35, 25, 445, DateTimeKind.Local).AddTicks(1516), 1 });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 23, 35, 25, 445, DateTimeKind.Local).AddTicks(1588), 1, "درس2" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 23, 35, 25, 445, DateTimeKind.Local).AddTicks(1596), 1, "درس3" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 23, 35, 25, 445, DateTimeKind.Local).AddTicks(1604), 1, "درس4" });

            migrationBuilder.InsertData(
                table: "lookup_values",
                columns: new[] { "Id", "lookup_id", "LookupValueName" },
                values: new object[,]
                {
                    { 1, 1, "مدير" },
                    { 2, 1, "مشرف" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "contact_info",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "lookup_values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "lookup_values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "lookups",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "created_at", "created_by" },
                values: new object[] { new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(759), 4 });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(772), 4, "دررس" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(783), 4, "درس2" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "created_at", "created_by", "Title" },
                values: new object[] { new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(794), 4, "درس3" });

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 1,
                column: "content",
                value: "kjknjknjknjnjnk");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 2,
                column: "content",
                value: "nkjnkoiuutdrf");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 3,
                column: "content",
                value: "sdaer4er");

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 4,
                column: "content",
                value: "dser4xs");
        }
    }
}
