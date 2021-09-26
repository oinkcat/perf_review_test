using Microsoft.EntityFrameworkCore.Migrations;

namespace PerfReviewsTest.Migrations
{
    public partial class ReviewOnDeleteCascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Reviews_ReviewId",
                table: "Results");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Reviews_ReviewId",
                table: "Results",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Reviews_ReviewId",
                table: "Results");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Reviews_ReviewId",
                table: "Results",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
