using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class removecontentIDfromtopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Topics__content___4D94879B",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_content_id",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "content_id",
                table: "Topics");

            migrationBuilder.AddColumn<int>(
                name: "topic_id",
                table: "topic_content",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 5, 51, 31, 478, DateTimeKind.Utc).AddTicks(7055));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 5, 51, 31, 478, DateTimeKind.Utc).AddTicks(7061));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 5, 51, 31, 478, DateTimeKind.Utc).AddTicks(7062));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "created_at",
                value: new DateTime(2023, 12, 19, 5, 51, 31, 478, DateTimeKind.Utc).AddTicks(7064));

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 1,
                column: "topic_id",
                value: 1);

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 2,
                column: "topic_id",
                value: 2);

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 3,
                column: "topic_id",
                value: 3);

            migrationBuilder.UpdateData(
                table: "topic_content",
                keyColumn: "Id",
                keyValue: 4,
                column: "topic_id",
                value: 4);

            migrationBuilder.CreateIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content",
                column: "topic_id");

            migrationBuilder.AddForeignKey(
                name: "FK_topic_content_Topics_topic_id",
                table: "topic_content",
                column: "topic_id",
                principalTable: "Topics",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_topic_content_Topics_topic_id",
                table: "topic_content");

            migrationBuilder.DropIndex(
                name: "IX_topic_content_topic_id",
                table: "topic_content");

            migrationBuilder.DropColumn(
                name: "topic_id",
                table: "topic_content");

            migrationBuilder.AddColumn<int>(
                name: "content_id",
                table: "Topics",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "content_id", "created_at" },
                values: new object[] { 1, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2664) });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "content_id", "created_at" },
                values: new object[] { 2, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2690) });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "content_id", "created_at" },
                values: new object[] { 3, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2696) });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "content_id", "created_at" },
                values: new object[] { 4, new DateTime(2023, 12, 17, 4, 37, 31, 912, DateTimeKind.Utc).AddTicks(2701) });

            migrationBuilder.CreateIndex(
                name: "IX_Topics_content_id",
                table: "Topics",
                column: "content_id");

            migrationBuilder.AddForeignKey(
                name: "FK__Topics__content___4D94879B",
                table: "Topics",
                column: "content_id",
                principalTable: "topic_content",
                principalColumn: "Id");
        }
    }
}
