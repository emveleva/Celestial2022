using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CelestialDbContext _context;

        private readonly UserManager<AppUser> _userManager;

        public UserRepository(CelestialDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;

            _userManager = userManager;
        }
        public  async Task AddToLiked(LikedArticle likedArticle)
        {

             var user = await _context.Users
                .Where(u => u.Id == likedArticle.UserId)
                .Include(u => u.LikedArticles)
                .FirstOrDefaultAsync();

            var article = await _context.Articles.FirstOrDefaultAsync(u => u.Id == likedArticle.ArticleId);

            if (!user.LikedArticles.Any(b => b.ArticleId == likedArticle.ArticleId))
            {
                user.LikedArticles.Add(new LikedArticle()
                {
                    ArticleId = article.Id,
                    UserId = user.Id,
                    AppUser = user,
                    Article = article
                }) ;
            }

        }


        public async Task<IEnumerable<Article>> GetLikedArticles(int userId)
        {
            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.LikedArticles)
                .ThenInclude(u => u.Article)
                .FirstOrDefaultAsync();


            return user.Articles
                .Select(a => new Article()
                {
                    Id = a.Id,
                    Title = a.Title,
                    AuthorFirstName = a.AuthorFirstName,
                    AuthorLastName = a.AuthorLastName,
                    Body = a.Body,
                    CreatedOn = a.CreatedOn,
                    ImageUrl = a.ImageUrl,
                    AppUserId = a.AppUserId
                }).ToList();
        }

        public async Task RemoveFromLiked(int articleId, int userId)
        {
            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.LikedArticles)
                .FirstOrDefaultAsync();

            var article = user.LikedArticles.FirstOrDefault(a => a.ArticleId == articleId);

            if (article != null)
            {
                user.LikedArticles.Remove(article);
            }
        }

        public async Task<AppUser> GetUserProfile(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            return user;
        }
        public async Task<IdentityResult> UpdateUserProfile(AppUser appUser)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == appUser.Id);

                user.FirstName = appUser.FirstName;
                user.LastName = appUser.LastName;
                user.Email = appUser.Email;

             return await _userManager.UpdateAsync(user);
        }

    }
}