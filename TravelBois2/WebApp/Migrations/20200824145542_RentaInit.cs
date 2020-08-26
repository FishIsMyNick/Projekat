using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class RentaInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kola",
                columns: table => new
                {
                    Naziv = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    BrojMesta = table.Column<byte>(type: "tinyint", nullable: false),
                    Godiste = table.Column<short>(type: "smallint", nullable: false),
                    TipVozila = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kola", x => x.Naziv);
                });

            migrationBuilder.CreateTable(
                name: "OceneKola",
                columns: table => new
                {
                    ID = table.Column<string>(nullable: false),
                    Value = table.Column<decimal>(type: "decimal(1,1)", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Kompanija = table.Column<string>(type: "nvarchar(40)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneKola", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OceneRente",
                columns: table => new
                {
                    ID = table.Column<string>(nullable: false),
                    Value = table.Column<decimal>(type: "decimal(1,1)", nullable: false),
                    kompanija = table.Column<string>(type: "nvarchar(40)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneRente", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Rente",
                columns: table => new
                {
                    Naziv = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AdminID = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProsecnaOcena = table.Column<decimal>(type: "decimal(1,1)", nullable: false),
                    BrojOcena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rente", x => x.Naziv);
                });

            migrationBuilder.CreateTable(
                name: "Zauzetost",
                columns: table => new
                {
                    ID = table.Column<string>(nullable: false),
                    Kola = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Renta = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Od = table.Column<DateTime>(type: "date", nullable: false),
                    Do = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zauzetost", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kola");

            migrationBuilder.DropTable(
                name: "OceneKola");

            migrationBuilder.DropTable(
                name: "OceneRente");

            migrationBuilder.DropTable(
                name: "Rente");

            migrationBuilder.DropTable(
                name: "Zauzetost");
        }
    }
}
