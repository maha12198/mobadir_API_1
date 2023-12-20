using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class changesinTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "created_at",
                value: new DateTime(2023, 12, 20, 3, 46, 16, 644, DateTimeKind.Utc).AddTicks(5282));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "created_at",
                value: new DateTime(2023, 12, 20, 3, 46, 16, 644, DateTimeKind.Utc).AddTicks(5291));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "created_at",
                value: new DateTime(2023, 12, 20, 3, 46, 16, 644, DateTimeKind.Utc).AddTicks(5298));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "created_at",
                value: new DateTime(2023, 12, 20, 3, 46, 16, 644, DateTimeKind.Utc).AddTicks(5306));

            migrationBuilder.CreateIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content",
                column: "topic_id",
                unique: true,
                filter: "[topic_id] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 18, 47, 32, 292, DateTimeKind.Utc).AddTicks(2283));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 18, 47, 32, 292, DateTimeKind.Utc).AddTicks(2294));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 18, 47, 32, 292, DateTimeKind.Utc).AddTicks(2303));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 18, 47, 32, 292, DateTimeKind.Utc).AddTicks(2312));

            migrationBuilder.CreateIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content",
                column: "topic_id");
        }
    }
}
