using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Basic actions on data
    /// </summary>
    public interface IAsyncRepository<T, U>
    {
        /// <summary>
        /// Get one item by it's id
        /// </summary>
        /// <param name="id">Item's identifier</param>
        /// <returns>Specified item</returns>
        ValueTask<T> GetByIdAsync(U id);

        /// <summary>
        /// Get all items in this repo
        /// </summary>
        /// <returns>List of all available items</returns>
        Task<List<T>> GetAllAsync();

        /// <summary>
        /// Add new item to repo
        /// </summary>
        /// <param name="item">An item to add</param>
        Task AddAsync(T item);

        /// <summary>
        /// Update item information
        /// </summary>
        /// <param name="item">An item to update</param>
        Task UpdateAsync(T item);

        /// <summary>
        /// Remove one item from repo
        /// </summary>
        /// <param name="item">An item to remove</param>
        Task RemoveAsync(T item);
    }
}
