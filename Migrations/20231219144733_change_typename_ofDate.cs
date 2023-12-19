using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobadir_API_1.Migrations
{
    public partial class change_typename_ofDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                table: "Topics",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Topics",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "updated_at",
                table: "Topics",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Topics",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

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
        }
    }
}
