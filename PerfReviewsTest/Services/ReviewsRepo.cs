using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// User performance reviews repository
    /// </summary>
    public class ReviewsRepo : IAsyncRepository<Review, int>
    {
        private readonly PerfContext context;

        public ReviewsRepo(PerfContext ctx) => context = ctx;

        /// <inheritdoc />
        public ValueTask<Review> GetByIdAsync(int id) => context.Reviews.FindAsync(id);

        /// <inheritdoc />
        public Task<List<Review>> GetAllAsync() => context.Reviews
            .Include(r => r.User)
            .Where(r => r.Active)
            .OrderBy(r => r.User.Name)
            .ThenBy(r => r.Timestamp)
            .ToListAsync();

        /// <inheritdoc />
        public async Task AddAsync(Review item)
        {
            item.Timestamp = DateTime.Now;

            context.Reviews.Add(item);
            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public Task UpdateAsync(Review item)
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc />
        public async Task RemoveAsync(Review item)
        {
            context.Reviews.Remove(item);
            await context.SaveChangesAsync();
        }
    }
}
