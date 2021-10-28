using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PerfReviewsTest.Services;

namespace PerfReviewsTest.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        private readonly JwtAuthenticator authenticator;

        public AuthController(JwtAuthenticator authenticator)
        {
            this.authenticator = authenticator;
        }

        [HttpPost("/api/[controller]/login")]
        public async Task<object> Login([FromForm]string userName)
        {
            if (String.IsNullOrWhiteSpace(userName)) { return Forbid(); }

            var userToken = await authenticator.GetTokenForUserByLogin(userName);

            if (userToken == null) { return Forbid(); }

            return new {
                user = userName,
                token = new JwtSecurityTokenHandler().WriteToken(userToken)
            };
        }
    }
}
