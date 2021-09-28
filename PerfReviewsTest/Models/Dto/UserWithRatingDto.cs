using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PerfReviewsTest.Models.Dto
{
    public class UserWithRatingDto
    {
        public string Login { get; set; }

        public string Name { get; set; }

        public double? Rating { get; set; }

        public int MarksCount { get; set; }

        public UserWithRatingDto(User user)
        {
            Login = user.Login;
            Name = user.Name;

            var allResultsGiven = user.Reviews
                .SelectMany(rev => rev.Results)
                .Where(res => res.Mark.HasValue)
                .ToList();

            MarksCount = allResultsGiven.Count;

            if(allResultsGiven.Count > 0)
            {
                Rating = Math.Round(allResultsGiven.Average(r => r.Mark.Value), 1);
            }
        }
    }
}
