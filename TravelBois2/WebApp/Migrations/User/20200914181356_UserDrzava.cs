using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations.User
{
    public partial class UserDrzava : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Drzava",
                table: "AppUsers",
                type: "nvarchar(30)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Drzava",
                table: "AppUsers");
        }
    }
}
