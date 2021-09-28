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
    /// User ratings web API
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly ILogger<RatingsController> logger;

        private readonly IUsersRepository usersRepo;

        private readonly IReviewer reviewSvc;

        public RatingsController (
            ILogger<RatingsController> logger,
            IUsersRepository usersRepo,
            IReviewer reviewSvc
        )
        {
            this.logger = logger;
            this.usersRepo = usersRepo;
            this.reviewSvc = reviewSvc;
        }

        [HttpGet("{userLogin}")]
        public async Task<List<ResultDto>> Get(string userLogin)
        {
            var reviewerUser = await usersRepo.GetByIdAsync(userLogin);
            var availableReviews = await reviewSvc.GetReviewsForUser(reviewerUser);

            return availableReviews
                .Select(r => new ResultDto(r))
                .ToList();
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]string markValue)
        {
            var reviewResult = await reviewSvc.GetByIdAsync(id);
            var targetUser = reviewResult.Review.User;
            ushort mark = ushort.Parse(markValue);

            await reviewSvc.RateUser(reviewResult.Reviewer, targetUser, mark);

            logger.LogInformation("User {0} rated by user {1} with {2}", 
                                  reviewResult.Reviewer, 
                                  targetUser,
                                  mark);
        }
    }
}
