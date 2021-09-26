using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PerfReviewsTest.Models;
using PerfReviewsTest.Models.Dto;
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
        public async Task<ReviewInfo> Get(int id)
        {
            var reviewToEdit = await reviewsRepo.GetByIdAsync(id);
            return new ReviewInfo(reviewToEdit);
        }

        [HttpPost]
        public async Task Post([FromBody]ReviewInfo info)
        {
            await reviewsRepo.AddAsync(info.ToReview());
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]ReviewInfo info)
        {
            await reviewsRepo.UpdateAsync(info.ToReview());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var reviewToRemove = await reviewsRepo.GetByIdAsync(id);

            if(reviewToRemove != null)
            {
                await reviewsRepo.RemoveAsync(reviewToRemove);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
