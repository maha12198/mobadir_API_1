using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class seeding_data_to_Topic_TopicContent_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "LastVisited", "Password", "Role", "Token", "updated_at", "Username" },
                values: new object[] { 1, null, "2fgaPCZ6OmgiQLFYSSpLRAX+5byS3U/ryK6eXSBmtQHYAnu6", 1, null, null, "admin" });

            migrationBuilder.InsertData(
                table: "topic_content",
                columns: new[] { "Id", "content" },
                values: new object[,]
                {
                    { 1, "kjknjknjknjnjnk" },
                    { 2, "nkjnkoiuutdrf" },
                    { 3, "sdaer4er" },
                    { 4, "dser4xs" }
                });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "content_id", "created_at", "created_by", "is_visible", "subject_id", "Term", "Title", "updated_at", "VideoUrl" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2664), 1, true, 1, 1, "درس1", null, null },
                    { 2, 2, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2690), 1, true, 1, 2, "دررس", null, null },
                    { 3, 3, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2696), 1, true, 6, 1, "درس2", null, null },
                    { 4, 4, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2701), 1, true, 6, 2, "درس3", null, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
