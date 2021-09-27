using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Allow user to make review on other users
    /// </summary>
    public class PerfReviewer : IReviewer
    {
        private readonly PerfContext context;

        public PerfReviewer(PerfContext ctx) => context = ctx;

        /// <inheritdoc />
        public Task<Result> GetByIdAsync(int id) => context.Results
            .Include(res => res.Reviewer)
            .Include(res => res.Review)
            .ThenInclude(rev => rev.User)
            .SingleOrDefaultAsync(res => res.Id == id);

        /// <inheritdoc />
        public Task<List<Result>> GetReviewsForUser(User user) => context.Results
            .Include(res => res.Review)
            .ThenInclude(rev => rev.User)
            .Where(res => res.Reviewer.Login.Equals(user.Login))
            .OrderBy(res => res.Review.User.Name)
            .ToListAsync();

        /// <inheritdoc />
        public async Task RateUser(User reviewer, User target, ushort rating)
        {
            var resultToUpdate = await context.Results
                .SingleAsync(res => res.Reviewer.Login.Equals(reviewer.Login) &&
                                    res.Review.User.Login.Equals(target.Login));

            resultToUpdate.Timestamp = DateTime.Now;
            resultToUpdate.Mark = rating;

            await context.SaveChangesAsync();
        }
    }
}
