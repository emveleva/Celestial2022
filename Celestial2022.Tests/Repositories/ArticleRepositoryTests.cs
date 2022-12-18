using API.Controllers;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Repositories;
using Microsoft.EntityFrameworkCore;
using Telerik.JustMock;
using Telerik.JustMock.Helpers;

namespace Celestial2022.Tests.Repositories
{
    public class ArticleRepositoryTests
    {
        private readonly CelestialDbContext _context;

        public ArticleRepositoryTests()
        {
            DbContextOptionsBuilder options = new DbContextOptionsBuilder<CelestialDbContext>()
               .UseInMemoryDatabase(
                   Guid.NewGuid().ToString() // Use GUID so every test will use a different db
               );

            _context = new CelestialDbContext((DbContextOptions<CelestialDbContext>)options.Options);
        }
        

        [Fact]
        public async Task GetArticle_WithValidId_ShouldReturnArticle()
        {
            // Arrange
            var articleId = 1;
            _context.Articles.Add(new Article
            {
                Id = articleId,
                Title = "Title",
                AuthorFirstName = "AuthorFirstName",
                AuthorLastName = "AuthorLastName",
                Body = "Body",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }
            });
            await _context.SaveChangesAsync();

            var sut = new EditorRepository(_context);

            // Act
            Article result = await sut.GetArticle(articleId);

            // Assert
            Assert.NotNull(result);
        }


        [Fact]
        public async Task GetArticle_WithInvalidId_ShouldNotReturnArticle()
        {
            // Arrange
            var articleId = 1;
            _context.Articles.Add(new Article
            {
                Id = articleId,
                Title = "Title",
                AuthorFirstName = "AuthorFirstName",
                AuthorLastName = "AuthorLastName",
                Body = "Body",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }
            });
            await _context.SaveChangesAsync();

            var sut = new EditorRepository(_context);

            // Act
            Article result = await sut.GetArticle(-1);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async void GetArticles_ShouldReturnList()
        {
            // Arrange
            var articles = new List<Article>() {
                new() { Title = "Title1",
                AuthorFirstName = "AuthorFirstName1",
                AuthorLastName = "AuthorLastName1",
                Body = "Body1",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl1",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }},

                new() { Title = "Title2",
                AuthorFirstName = "AuthorFirstName2",
                AuthorLastName = "AuthorLastName2",
                Body = "Body2",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl2",
                AppUserId = 3,
                LikedArticles = new List<LikedArticle> { }},

                new() { Title = "Title3",
                AuthorFirstName = "AuthorFirstName3",
                AuthorLastName = "AuthorLastName3",
                Body = "Body3",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl3",
                AppUserId = 2,
                LikedArticles = new List<LikedArticle> { }},
            };

            _context.Articles.AddRange(articles);
            await _context.SaveChangesAsync();

            var sut = new ArticleRepository(_context);

            // Act
            var result = await sut.GetArticles();

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Count() == articles.Count);


        }
    }
}