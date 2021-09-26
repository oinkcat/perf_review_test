﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PerfReviewsTest.Services;

namespace PerfReviewsTest.Migrations
{
    [DbContext(typeof(PerfContext))]
    partial class PerfContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PerfReviewsTest.Models.Result", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Mark")
                        .HasColumnType("int");

                    b.Property<int?>("ReviewId")
                        .HasColumnType("int");

                    b.Property<string>("ReviewerLogin")
                        .HasColumnType("nvarchar(16)");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ReviewId");

                    b.HasIndex("ReviewerLogin");

                    b.ToTable("Results");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserLogin")
                        .HasColumnType("nvarchar(16)");

                    b.HasKey("Id");

                    b.HasIndex("UserLogin");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.User", b =>
                {
                    b.Property<string>("Login")
                        .HasMaxLength(16)
                        .HasColumnType("nvarchar(16)");

                    b.Property<string>("Name")
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.HasKey("Login");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.Result", b =>
                {
                    b.HasOne("PerfReviewsTest.Models.Review", "Review")
                        .WithMany("Results")
                        .HasForeignKey("ReviewId");

                    b.HasOne("PerfReviewsTest.Models.User", "Reviewer")
                        .WithMany("Results")
                        .HasForeignKey("ReviewerLogin");

                    b.Navigation("Review");

                    b.Navigation("Reviewer");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.Review", b =>
                {
                    b.HasOne("PerfReviewsTest.Models.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserLogin");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.Review", b =>
                {
                    b.Navigation("Results");
                });

            modelBuilder.Entity("PerfReviewsTest.Models.User", b =>
                {
                    b.Navigation("Results");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
