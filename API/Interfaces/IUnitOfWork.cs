using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IArticleRepository ArticleRepository { get; }
        IEditorRepository EditorRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}