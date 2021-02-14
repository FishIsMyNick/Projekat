using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class RentaInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Filijale",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivRente = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(20)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filijale", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kola",
                columns: table => new
                {
                    Naziv = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    NazivRente = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    filijalaID = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BrojMesta = table.Column<byte>(type: "tinyint", nullable: false),
                    Godiste = table.Column<short>(type: "smallint", nullable: false),
                    TipVozila = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Cena = table.Column<short>(type: "smallint", nullable: false),
                    CenaBrzeRezervacije = table.Column<short>(type: "smallint", nullable: false),
                    BrzaRezervacija = table.Column<bool>(type: "bit", nullable: false),
                    BrzaRezervacijaOd = table.Column<DateTime>(type: "date", nullable: false),
                    BrzaRezervacijaDo = table.Column<DateTime>(type: "date", nullable: false)
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
                    Value = table.Column<short>(type: "smallint", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(40)", nullable: true),
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
                    Value = table.Column<short>(type: "smallint", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(40)", nullable: true),
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
                    Opis = table.Column<string>(type: "nvarchar(200)", nullable: true)
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
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
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
                name: "Filijale");

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
