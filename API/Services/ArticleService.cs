using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ArticleService : IArticleService
    {
        private readonly CelestialDbContext context;

        public ArticleService(CelestialDbContext _context)
        {
            context = _context;
        }

        public async Task AddToLiked(int articleId, int userId)
        { 
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.LikedArticles)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid user ID");
            }

            var article = await context.Articles.FirstOrDefaultAsync(u => u.Id == articleId);

            if (article == null)
            {
                throw new ArgumentException("Invalid Article ID");
            }

            if (!user.LikedArticles.Any(a => a.ArticleId == articleId))
            {
                user.LikedArticles.Add(new LikedArticle()
                {
                    ArticleId = article.Id,
                    AppUserId = user.Id,
                    Article = article,
                    AppUser = user
                }) ;

                await context.SaveChangesAsync();
            }
        }

         public async Task<IEnumerable<Article>> GetLikedArticles(int userId)
        {
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.LikedArticles)
                .ThenInclude(ub => ub.Article)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid user ID");
            }

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
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.LikedArticles)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid user ID");
            }

            var article = user.LikedArticles.FirstOrDefault(a => a.ArticleId == articleId);

            if (article != null)
            {
                user.LikedArticles.Remove(article);

                await context.SaveChangesAsync();
            }
        }
    }
}
