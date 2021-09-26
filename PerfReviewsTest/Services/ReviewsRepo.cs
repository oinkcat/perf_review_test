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
        public async ValueTask<Review> GetByIdAsync(int id) => await context.Reviews
            .Include(rev => rev.User)
            .Include(rev => rev.Results)
            .ThenInclude(res => res.Reviewer)
            .SingleOrDefaultAsync(rev => rev.Id == id);

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
            item.Active = true;
            item.Timestamp = DateTime.Now;
            item.User = await context.Users.FindAsync(item.User.Login);
            
            foreach(var result in item.Results)
            {
                result.Timestamp = item.Timestamp;
                result.Reviewer = await context.Users.FindAsync(result.Reviewer.Login);
            }

            context.Reviews.Add(item);
            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task UpdateAsync(Review item)
        {
            var newReviewerLogins = new HashSet<string> (
                item.Results.Select(res => res.Reviewer.Login
            ));

            var reviewToUpdate = await GetByIdAsync(item.Id);
            context.Entry(reviewToUpdate).State = EntityState.Modified;

            // Deleting excluded participants' results
            for(int i = reviewToUpdate.Results.Count - 1; i >= 0; i--)
            {
                var result = reviewToUpdate.Results[i];
                if(!newReviewerLogins.Contains(result.Reviewer.Login))
                {
                    reviewToUpdate.Results.Remove(result);
                }
                else
                {
                    newReviewerLogins.Remove(result.Reviewer.Login);
                }
            }

            // Adding results for newly included
            foreach(string newReviewerLogin in newReviewerLogins)
            {
                var newReviewerResult = new Result
                {
                    Timestamp = reviewToUpdate.Timestamp,
                    Reviewer = await context.Users.FindAsync(newReviewerLogin)
                };
                reviewToUpdate.Results.Add(newReviewerResult);
            }

            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task RemoveAsync(Review item)
        {
            context.Reviews.Remove(item);
            await context.SaveChangesAsync();
        }
    }
}
