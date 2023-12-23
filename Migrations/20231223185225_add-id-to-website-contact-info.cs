using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class addidtowebsitecontactinfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "contact_info",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_contact_info",
                table: "contact_info",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(759));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(772));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(783));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 22, 52, 24, 173, DateTimeKind.Utc).AddTicks(794));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_contact_info",
                table: "contact_info");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "contact_info");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 0, 55, 30, 671, DateTimeKind.Utc).AddTicks(5936));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 0, 55, 30, 671, DateTimeKind.Utc).AddTicks(5948));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 0, 55, 30, 671, DateTimeKind.Utc).AddTicks(5960));

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                column: "created_at",
                value: new DateTime(2023, 12, 23, 0, 55, 30, 671, DateTimeKind.Utc).AddTicks(5972));
        }
    }
}
