using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PerfReviewsTest.Models;

namespace PerfReviewsTest.Services
{
    public class ResultsRepo : IAsyncRepository<Result, int>
    {
        public Task AddAsync(Result item)
        {
            throw new NotImplementedException();
        }

        public Task<List<Result>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<Result> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAsync(Result item)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Result item)
        {
            throw new NotImplementedException();
        }
    }
}
