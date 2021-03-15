using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class initAvio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aviokompanije",
                columns: table => new
                {
                    Naziv = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aviokompanije", x => x.Naziv);
                });

            migrationBuilder.CreateTable(
                name: "BrzeRezervacije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdLeta = table.Column<int>(type: "int", nullable: false),
                    IdSedista = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaSedista = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrzeRezervacije", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OceneLeta",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    IdLeta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneLeta", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Pozivnice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojPasosa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rezervisano = table.Column<bool>(type: "bit", nullable: false),
                    IdLeta = table.Column<int>(type: "int", nullable: false),
                    IdSedista = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaSedista = table.Column<int>(type: "int", nullable: false),
                    PozvaoUsername = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pozivnice", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SedistaLeta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojPasosa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rezervisano = table.Column<bool>(type: "bit", nullable: false),
                    IdLeta = table.Column<int>(type: "int", nullable: false),
                    IdSedista = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CenaSedista = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SedistaLeta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Aerodromi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aviokompanija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AviokompanijaNaziv = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aerodromi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aerodromi_Aviokompanije_AviokompanijaNaziv",
                        column: x => x.AviokompanijaNaziv,
                        principalTable: "Aviokompanije",
                        principalColumn: "Naziv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Letovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DatumPolaska = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumDolaska = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VremePoletanja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VremeSletanja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MestoPolaska = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MestoDolaska = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RazdaljinaPutovanja = table.Column<int>(type: "int", nullable: false),
                    TrajanjePutovanja = table.Column<int>(type: "int", nullable: false),
                    KlasaLeta = table.Column<int>(type: "int", nullable: false),
                    TipLeta = table.Column<int>(type: "int", nullable: false),
                    CenaKarte = table.Column<int>(type: "int", nullable: false),
                    Aviokompanija = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AviokompanijaNaziv = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Letovi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Letovi_Aviokompanije_AviokompanijaNaziv",
                        column: x => x.AviokompanijaNaziv,
                        principalTable: "Aviokompanije",
                        principalColumn: "Naziv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OceneAviokompanije",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Value = table.Column<byte>(type: "tinyint", nullable: false),
                    kompanija = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    AviokompanijaNaziv = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneAviokompanije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneAviokompanije_Aviokompanije_AviokompanijaNaziv",
                        column: x => x.AviokompanijaNaziv,
                        principalTable: "Aviokompanije",
                        principalColumn: "Naziv",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Presedanja",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Grad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presedanja", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Presedanja_Letovi_LetId",
                        column: x => x.LetId,
                        principalTable: "Letovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aerodromi_AviokompanijaNaziv",
                table: "Aerodromi",
                column: "AviokompanijaNaziv");

            migrationBuilder.CreateIndex(
                name: "IX_Letovi_AviokompanijaNaziv",
                table: "Letovi",
                column: "AviokompanijaNaziv");

            migrationBuilder.CreateIndex(
                name: "IX_OceneAviokompanije_AviokompanijaNaziv",
                table: "OceneAviokompanije",
                column: "AviokompanijaNaziv");

            migrationBuilder.CreateIndex(
                name: "IX_Presedanja_LetId",
                table: "Presedanja",
                column: "LetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aerodromi");

            migrationBuilder.DropTable(
                name: "BrzeRezervacije");

            migrationBuilder.DropTable(
                name: "OceneAviokompanije");

            migrationBuilder.DropTable(
                name: "OceneLeta");

            migrationBuilder.DropTable(
                name: "Pozivnice");

            migrationBuilder.DropTable(
                name: "Presedanja");

            migrationBuilder.DropTable(
                name: "SedistaLeta");

            migrationBuilder.DropTable(
                name: "Letovi");

            migrationBuilder.DropTable(
                name: "Aviokompanije");
        }
    }
}
