using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations.User
{
    public partial class UserPromPassNull2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
               name: "PromenioPassword",
               table: "AppUsers",
               type: "bit",
               nullable: true,
               defaultValue: null,
               oldClrType: typeof(bool),
               oldType: "boolean");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
