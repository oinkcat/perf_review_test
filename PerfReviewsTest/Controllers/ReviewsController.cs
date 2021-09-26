using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PerfReviewsTest.Models;
using PerfReviewsTest.Services;

namespace PerfReviewsTest.Controllers
{
    /// <summary>
    /// Reviews web API
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ILogger<ReviewsController> logger;

        private readonly IAsyncRepository<Review, int> reviewsRepo;

        public ReviewsController (
            ILogger<ReviewsController> logger,
            IAsyncRepository<Review, int> reviewsRepo
        )
        {
            this.logger = logger;
            this.reviewsRepo = reviewsRepo;
        }

        [HttpGet]
        public async Task<List<Review>> Get()
        {
            var reviewsList = await reviewsRepo.GetAllAsync();
            reviewsList.ForEach(r => r.User.Reviews = null);

            return reviewsList;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
