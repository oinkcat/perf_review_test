using Microsoft.EntityFrameworkCore.Migrations;

namespace PerfReviewsTest.Migrations
{
    public partial class AddReviewResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Users_UserLogin",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "UserLogin",
                table: "Results",
                newName: "ReviewerLogin");

            migrationBuilder.RenameIndex(
                name: "IX_Results_UserLogin",
                table: "Results",
                newName: "IX_Results_ReviewerLogin");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Users_ReviewerLogin",
                table: "Results",
                column: "ReviewerLogin",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Users_ReviewerLogin",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "ReviewerLogin",
                table: "Results",
                newName: "UserLogin");

            migrationBuilder.RenameIndex(
                name: "IX_Results_ReviewerLogin",
                table: "Results",
                newName: "IX_Results_UserLogin");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Users_UserLogin",
                table: "Results",
                column: "UserLogin",
                principalTable: "Users",
                principalColumn: "Login",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
