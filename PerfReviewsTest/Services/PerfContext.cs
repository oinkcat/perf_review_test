using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Database context
    /// </summary>
    public class PerfContext : DbContext
    {
        private const string DefaultConnString = @"Server=(localdb)\mssqllocaldb;Database=PerfReviews";

        private string connectionString;

        /// <summary>
        /// All users
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// All performance reviews
        /// </summary>
        public DbSet<Review> Reviews { get; set; }

        /// <summary>
        /// All review results
        /// </summary>
        public DbSet<Result> Results { get; set; }

        public PerfContext(string connString) => connectionString = connString;

        public PerfContext()
        { }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connSring = connectionString ?? DefaultConnString;
            optionsBuilder.UseSqlServer(connSring);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User entity
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.Property(u => u.Login).HasMaxLength(16);
            userBuilder.Property(u => u.Name).HasMaxLength(64);
            userBuilder.HasKey(u => u.Login);
        }
    }
}
