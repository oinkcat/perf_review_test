using System;
using System.Collections.Generic;
using System.Linq;

namespace PerfReviewsTest.Models.Dto
{
    /// <summary>
    /// Review result information for display on page
    /// </summary>
    public class ResultDto
    {
        public int Id { get; set; }
        
        public User TargetUser { get; set; }

        public ushort? Mark { get; set; }

        public string Comment { get; set; }

        public ResultDto(Result result)
        {
            Id = result.Id;
            TargetUser = result.Review.User;
            Mark = result.Mark;
            Comment = result.Comment;

            TargetUser.Results = null;
            TargetUser.Reviews = null;
        }
    }
}
