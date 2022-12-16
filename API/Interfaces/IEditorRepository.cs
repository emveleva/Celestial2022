using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IEditorRepository
    {
        Task<IEnumerable<Article>> GetUserArticles(int id);

        Task<Article> GetArticle(int id);

        Task PostArticle(Article article);

        void EditArticle(Article article);

        void DeleteArticle(int articleId);

    }
}