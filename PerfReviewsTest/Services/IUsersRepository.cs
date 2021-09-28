using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Additional actions with users
    /// </summary>
    public interface IUsersRepository : IAsyncRepository<User, string>
    {
        /// <summary>
        /// Get all users with it's ratings
        /// </summary>
        /// <returns>Users list with ratings included</returns>
        Task<List<User>> GetAllWithRatingsAsync();
    }
}
