using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static API.Data.DataConstants.Article;

namespace API.Entities
{
    public class Article
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(AuthorFirstMaxLength)]
        public string AuthorFirstName { get; set; }

        [Required]
        [MaxLength(AuthorLastMaxLength)]
        public string AuthorLastName { get; set; }

        public string Body { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public string ImageUrl { get; set; }

        public int AppUserId { get; set; }
    }
}