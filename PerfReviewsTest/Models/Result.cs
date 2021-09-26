using System;
using System.Collections.Generic;
using System.Linq;

namespace PerfReviewsTest.Models
{
    /// <summary>
    /// User performance review's result
    /// </summary>
    public class Result
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Mark timestamp
        /// </summary>
        public DateTime Timestamp { get; set; }

        /// <summary>
        /// Review to which mark is assigned
        /// </summary>
        public Review Review { get; set; }

        /// <summary>
        /// User who gives a rate
        /// </summary>
        public User Reviewer { get; set; }

        /// <summary>
        /// Performance review's mark
        /// </summary>
        public ushort? Mark { get; set; }
    }
}
