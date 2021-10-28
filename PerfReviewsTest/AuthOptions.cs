using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace PerfReviewsTest
{
    /// <summary>
    /// Authentication options
    /// </summary>
    public static class AuthOptions
    {
        private const string Key = "$uper_$ecret_key";
        
        public const string Issuer = "PerfReviewIssuer";

        public const string Audience = "PerfReviewClient";

        public const string RoleEmployee = "user";

        public const string RoleAdmin = "admin";

        public static SymmetricSecurityKey GetSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
