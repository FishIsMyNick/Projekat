using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class RentOcena : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "Value",
                table: "OceneRente",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(1,1)");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "OceneRente",
                type: "nvarchar(40)",
                nullable: true);

            migrationBuilder.AlterColumn<short>(
                name: "Value",
                table: "OceneKola",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(1,1)");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "OceneKola",
                type: "nvarchar(40)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "OceneRente");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "OceneKola");

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "OceneRente",
                type: "decimal(1,1)",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "OceneKola",
                type: "decimal(1,1)",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");
        }
    }
}
