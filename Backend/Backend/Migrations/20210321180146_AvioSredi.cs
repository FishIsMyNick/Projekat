using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class AvioSredi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aerodromi_Aviokompanije_AviokompanijaNaziv",
                table: "Aerodromi");

            migrationBuilder.DropForeignKey(
                name: "FK_Letovi_Aviokompanije_AviokompanijaNaziv",
                table: "Letovi");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneAviokompanije_Aviokompanije_AviokompanijaNaziv",
                table: "OceneAviokompanije");

            migrationBuilder.DropIndex(
                name: "IX_OceneAviokompanije_AviokompanijaNaziv",
                table: "OceneAviokompanije");

            migrationBuilder.DropIndex(
                name: "IX_Letovi_AviokompanijaNaziv",
                table: "Letovi");

            migrationBuilder.DropIndex(
                name: "IX_Aerodromi_AviokompanijaNaziv",
                table: "Aerodromi");

            migrationBuilder.DropColumn(
                name: "AviokompanijaNaziv",
                table: "OceneAviokompanije");

            migrationBuilder.DropColumn(
                name: "AviokompanijaNaziv",
                table: "Letovi");

            migrationBuilder.DropColumn(
                name: "AviokompanijaNaziv",
                table: "Aerodromi");

            migrationBuilder.AddColumn<string>(
                name: "Drzava",
                table: "Aviokompanije",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Drzava",
                table: "Aviokompanije");

            migrationBuilder.AddColumn<string>(
                name: "AviokompanijaNaziv",
                table: "OceneAviokompanije",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AviokompanijaNaziv",
                table: "Letovi",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AviokompanijaNaziv",
                table: "Aerodromi",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OceneAviokompanije_AviokompanijaNaziv",
                table: "OceneAviokompanije",
                column: "AviokompanijaNaziv");

            migrationBuilder.CreateIndex(
                name: "IX_Letovi_AviokompanijaNaziv",
                table: "Letovi",
                column: "AviokompanijaNaziv");

            migrationBuilder.CreateIndex(
                name: "IX_Aerodromi_AviokompanijaNaziv",
                table: "Aerodromi",
                column: "AviokompanijaNaziv");

            migrationBuilder.AddForeignKey(
                name: "FK_Aerodromi_Aviokompanije_AviokompanijaNaziv",
                table: "Aerodromi",
                column: "AviokompanijaNaziv",
                principalTable: "Aviokompanije",
                principalColumn: "Naziv",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Letovi_Aviokompanije_AviokompanijaNaziv",
                table: "Letovi",
                column: "AviokompanijaNaziv",
                principalTable: "Aviokompanije",
                principalColumn: "Naziv",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OceneAviokompanije_Aviokompanije_AviokompanijaNaziv",
                table: "OceneAviokompanije",
                column: "AviokompanijaNaziv",
                principalTable: "Aviokompanije",
                principalColumn: "Naziv",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
