using System.ComponentModel.DataAnnotations;
using API.DTOs;
using Microsoft.AspNetCore.Identity;
using static API.Data.DataConstants.User;

namespace API.Entities
{
      public class AppUser : IdentityUser<int>
    {

        public string FirstName { get; init; }
        
        public string LastName { get; init; }

        public string ImageUrl { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public virtual ICollection<AppUserRole> UserRoles { get; set; }
        public virtual ICollection<LikedArticle> LikedArticles { get; set; }
        public virtual ICollection<Article> Articles { get; set; }
    }
}