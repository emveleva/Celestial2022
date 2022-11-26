using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using static API.Data.DataConstants.User;

namespace API.Entities
{
      public class User : IdentityUser
    {
        [Required]
        [MaxLength(FirstNameMaxLength)]
        public string? FirstName { get; init; }
        
        [Required]
        [MaxLength(LastNameMaxLength)]
        public string? LastName { get; init; }

        public string? ImageUrl { get; set; }

        public List<UserArticle> UserArticles { get; set; } = new List<UserArticle>();
    }
}