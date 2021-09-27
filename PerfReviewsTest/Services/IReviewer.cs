using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    public interface IReviewer
    {
        /// <summary>
        /// Get specified review result by it's id
        /// </summary>
        /// <param name="id">Review result's id</param>
        /// <returns>Review result</returns>
        Task<Result> GetByIdAsync(int id);

        /// <summary>
        /// Get all available reviews for spectfied user
        /// </summary>
        /// <param name="user">User who can review other users</param>
        /// <returns>Available reviews</returns>
        Task<List<Result>> GetReviewsForUser(User user);

        /// <summary>
        /// Make rating for specified user
        /// </summary>
        /// <param name="reviewer">User who rate</param>
        /// <param name="target">User for rating</param>
        /// <param name="rating">User's rating</param>
        Task RateUser(User reviewer, User target, ushort rating);
    }
}
