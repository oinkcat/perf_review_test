using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Users information database storage
    /// </summary>
    public class UsersRepo : IUsersRepository
    {
        private readonly PerfContext context;

        public UsersRepo(PerfContext ctx) => context = ctx;

        /// <inheritdoc />
        public ValueTask<User> GetByIdAsync(string id) => context.Users.FindAsync(id);

        /// <inheritdoc />
        public Task<List<User>> GetAllAsync() => context.Users
            .OrderBy(u => u.Name)
            .ToListAsync();

        /// <inheritdoc />
        public async Task AddAsync(User item)
        {
            context.Users.Add(item);
            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task UpdateAsync(User item)
        {
            context.Attach(item);
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task RemoveAsync(User item)
        {
            context.Remove(item);
            await context.SaveChangesAsync();
        }

        /// <inheritdoc />
        public Task<List<User>> GetAllWithRatingsAsync() => context.Users
            .Include(u => u.Reviews)
            .ThenInclude(rev => rev.Results)
            .OrderBy(u => u.Name)
            .ToListAsync();
    }
}
