using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace PerfReviewsTest.Services
{
    /// <summary>
    /// Creates JWT token for given user
    /// </summary>
    public class JwtAuthenticator
    {
        private const string AdminUserLogin = "admin";

        private const string AuthType = "Token";

        private readonly IUsersRepository usersRepo;

        public JwtAuthenticator(IUsersRepository usersRepo)
        {
            this.usersRepo = usersRepo;
        }

        public async Task<JwtSecurityToken> GetTokenForUserByLogin(string login)
        {
            var identity = await GetUserIdentity(login);

            if(identity != null)
            {
                var utcNow = DateTime.UtcNow;
                return new JwtSecurityToken(
                        issuer: AuthOptions.Issuer,
                        audience: AuthOptions.Audience,
                        claims: identity.Claims,
                        notBefore: utcNow,
                        expires: utcNow.AddMinutes(5),
                        signingCredentials: new SigningCredentials(
                            AuthOptions.GetSecurityKey(), 
                            SecurityAlgorithms.HmacSha256
                        )
                    );
            }
            else
            {
                return null;
            }
        }

        private async Task<ClaimsIdentity> GetUserIdentity(string login)
        {
            bool isAdmin = login.Equals(AdminUserLogin);
            string userRole = null;

            if (!isAdmin)
            {
                var user = (await usersRepo.GetAllAsync())
                    .FirstOrDefault(u => u.Login.Equals(login));

                if(user != null)
                {
                    userRole = AuthOptions.RoleEmployee;
                }
            }
            else
            {
                userRole = AuthOptions.RoleAdmin;
            }

            if(userRole != null)
            {
                var userClaims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, userRole)
                };

                return new ClaimsIdentity(userClaims, 
                                          AuthType, 
                                          ClaimsIdentity.DefaultNameClaimType, 
                                          ClaimsIdentity.DefaultRoleClaimType);
            }
            else
            {
                return null;
            }
        }
    }
}
