using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class addfiletypetofiletable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileExtension",
                table: "Files",
                type: "nvarchar(max)",
                nullable: true);

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 1,
            //    column: "created_at",
            //    value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9144));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 2,
            //    column: "created_at",
            //    value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9216));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 3,
            //    column: "created_at",
            //    value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9225));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 4,
            //    column: "created_at",
            //    value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9232));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileExtension",
                table: "Files");

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 1,
            //    column: "created_at",
            //    value: new DateTime(2023, 12, 27, 0, 14, 3, 647, DateTimeKind.Local).AddTicks(7834));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 2,
            //    column: "created_at",
            //    value: new DateTime(2023, 12, 27, 0, 14, 3, 647, DateTimeKind.Local).AddTicks(7877));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 3,
            //    column: "created_at",
            //    value: new DateTime(2023, 12, 27, 0, 14, 3, 647, DateTimeKind.Local).AddTicks(7881));

            //migrationBuilder.UpdateData(
            //    table: "Topics",
            //    keyColumn: "Id",
            //    keyValue: 4,
            //    column: "created_at",
            //    value: new DateTime(2023, 12, 27, 0, 14, 3, 647, DateTimeKind.Local).AddTicks(7885));
        }
    }
}
