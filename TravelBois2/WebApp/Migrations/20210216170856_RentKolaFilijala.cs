using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class RentKolaFilijala : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrzaRezervacija",
                table: "Kola");

            migrationBuilder.DropColumn(
                name: "BrzaRezervacijaDo",
                table: "Kola");

            migrationBuilder.DropColumn(
                name: "BrzaRezervacijaOd",
                table: "Kola");

            migrationBuilder.DropColumn(
                name: "filijalaID",
                table: "Kola");

            migrationBuilder.AddColumn<short>(
                name: "Filijala",
                table: "Kola",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Filijala",
                table: "Kola");

            migrationBuilder.AddColumn<bool>(
                name: "BrzaRezervacija",
                table: "Kola",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "BrzaRezervacijaDo",
                table: "Kola",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "BrzaRezervacijaOd",
                table: "Kola",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "filijalaID",
                table: "Kola",
                type: "nvarchar(40)",
                nullable: true);
        }
    }
}
