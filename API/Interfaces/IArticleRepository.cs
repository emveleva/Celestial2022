using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        Task<IEnumerable<Article>> GetArticles();

        Task<Article> GetArticle(int id);
    }
}