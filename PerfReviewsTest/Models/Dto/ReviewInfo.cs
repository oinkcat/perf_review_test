using System;
using System.Collections.Generic;
using System.Linq;

namespace PerfReviewsTest.Models.Dto
{
    /// <summary>
    /// Performance review info for editing
    /// </summary>
    public class ReviewInfo
    {
        public int Id { get; set; }

        public DateTime? Timestamp { get; set; }

        public string TargetUserLogin { get; set; }

        public string[] ReviewerLogins { get; set; }

        public ReviewInfo() { }

        public ReviewInfo(Review review)
        {
            Id = review.Id;
            Timestamp = review.Timestamp;
            TargetUserLogin = review.User.Login;
            ReviewerLogins = review.Results
                .Select(r => r.Reviewer.Login)
                .ToArray();
        }

        public Review ToReview()
        {
            return new Review
            {
                Id = Id,
                Timestamp = Timestamp ?? DateTime.MinValue,
                User = new User { Login = TargetUserLogin },
                Results = ReviewerLogins
                    .Select(l => new Result { Reviewer = new User { Login = l } })
                    .ToList()
            };
        }
    }
}
