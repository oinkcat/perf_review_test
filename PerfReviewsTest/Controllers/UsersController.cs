using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PerfReviewsTest.Models;
using PerfReviewsTest.Models.Dto;
using PerfReviewsTest.Services;

namespace PerfReviewsTest.Controllers
{
    /// <summary>
    /// Users web API
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> logger;

        private readonly IUsersRepository usersRepo;

        public UsersController(
            ILogger<UsersController> logger,
            IUsersRepository usersRepo
        )
        {
            this.logger = logger;
            this.usersRepo = usersRepo;
        }

        [HttpGet]
        public async Task<List<User>> Get() => await usersRepo.GetAllAsync();

        [HttpGet("with/rating")]
        public async Task<List<UserWithRatingDto>>GetWithRatings()
        {
            return (await usersRepo.GetAllWithRatingsAsync())
                .Select(u => new UserWithRatingDto(u))
                .ToList();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await usersRepo.GetByIdAsync(id);

            return (user != null)
                ? Ok(user)
                : NotFound();
        }

        [HttpPost]
        public async Task<string> Post([FromBody]User userInfo)
        {
            await usersRepo.AddAsync(userInfo);
            logger.LogInformation("Registered user: {0}", userInfo.Login);

            return userInfo.Login;
        }

        [HttpPut]
        public async Task Put([FromBody]User userInfo)
        {
            await usersRepo.UpdateAsync(userInfo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userToDelete = await usersRepo.GetByIdAsync(id);

            if(userToDelete != null)
            {
                await usersRepo.RemoveAsync(userToDelete);
                logger.LogInformation("Removed user: {0}", userToDelete.Login);

                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
