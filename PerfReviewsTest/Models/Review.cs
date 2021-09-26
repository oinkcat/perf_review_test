using System;
using System.Collections.Generic;
using System.Linq;

namespace PerfReviewsTest.Models
{
    /// <summary>
    /// User's performance review
    /// </summary>
    public class Review
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Review is active
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Date/time of review creation
        /// </summary>
        public DateTime Timestamp { get; set; }

        /// <summary>
        /// User to which review is assigned
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// Given results
        /// </summary>
        public IList<Result> Results { get; set; }
    }
}
