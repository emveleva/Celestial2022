using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly CelestialDbContext _context;

        public ArticleRepository(CelestialDbContext context)
        {
            _context = context;
        }

        public async Task<Article> GetArticle(int id)
        {
            return await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Article>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }
    }
}
