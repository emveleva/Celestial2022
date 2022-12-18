using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class EditorRepository : IEditorRepository
    {
        private readonly CelestialDbContext _context;

        public EditorRepository(CelestialDbContext context)
        {
            _context = context;
        }

        public async void DeleteArticle(int articleId)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == articleId);
             _context.Articles.Remove(article);
        }
        public void EditArticle(Article article)
        {
            _context.Entry(article).State = EntityState.Modified;
        }

        public async Task<Article> GetArticle(int id)
        {
            return await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Article>> GetUserArticles(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.Articles)
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

        public async Task PostArticle(Article article)
        {
            await _context.Articles.AddAsync(article);
        }
    }
}
