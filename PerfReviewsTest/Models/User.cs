using System;
using System.Collections.Generic;
using System.Linq;

namespace PerfReviewsTest.Models
{
    /// <summary>
    /// User account
    /// </summary>
    public class User
    {
        /// <summary>
        /// User login
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User's performance reviews
        /// </summary>
        public IList<Review> Reviews { get; set; }

        /// <summary>
        /// User performance reviews' results
        /// </summary>
        public IList<Result> Results { get; set; }

        /// <summary>
        /// String representation of user
        /// </summary>
        /// <returns>User login</returns>
        public override string ToString() => Login;
    }
}
