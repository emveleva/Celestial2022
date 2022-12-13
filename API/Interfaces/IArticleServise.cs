using API.Entities;

namespace API.Interfaces
{
    public interface IArticleService
    {
        Task AddToLiked(int articleId, int userId);

        Task<IEnumerable<Article>> GetLikedArticles(int userId);

        Task RemoveFromLiked(int articleId, int userId);
    }
}
