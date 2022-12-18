using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task AddToLiked(int userId, int articleId);

        Task<IEnumerable<Article>> GetLikedArticles(int userId);

        Task RemoveFromLiked(int articleId, int userId);

        Task<AppUser> GetUserProfile(int id);

        void UpdateUserProfile(AppUser user);
    }
}