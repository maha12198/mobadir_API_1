using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class changeanswertypetoint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Answer",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldNullable: true);

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 1,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7576));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 2,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7610));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 3,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7613));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 4,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 2, 22, 28, 11, 324, DateTimeKind.Local).AddTicks(7615));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Questions",
                type: "nvarchar(50)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 1,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9144));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 2,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9216));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 3,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9225));

        //    migrationBuilder.UpdateData(
        //        table: "Topics",
        //        keyColumn: "Id",
        //        keyValue: 4,
        //        column: "created_at",
        //        value: new DateTime(2024, 1, 1, 0, 44, 34, 935, DateTimeKind.Local).AddTicks(9232));
        }
    }
}
