using API.Controllers;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telerik.JustMock.Helpers;

namespace Celestial2022.Tests.Controllers
{
    public class EditorControllerTests
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CelestialDbContext _context;

        public EditorControllerTests()
        {
            DbContextOptionsBuilder options = new DbContextOptionsBuilder<CelestialDbContext>()
               .UseInMemoryDatabase(
                   Guid.NewGuid().ToString() // Use GUID so every test will use a different db
               );

            _context = new CelestialDbContext((DbContextOptions<CelestialDbContext>)options.Options);
            _unitOfWork = new Mock<IUnitOfWork>().Object;
        }

        [Fact]
        public async Task GetArticle_WithCorrectId_ShouldReturnArticle()
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

            var sut = new EditorController(_unitOfWork);

            // Act
            var result = sut.GetArticle(articleId);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetUserArticles_ShouldReturnUserArticles()
        {
            var userId = 1;
            _context.Users.Add(new AppUser
            {
                Id = userId,
                FirstName = "FirstName",
                LastName = "LastName",
                Email = "email@mail.com",
                ImageUrl = "ImageUrl",
                Created = DateTime.Now,
                LikedArticles = new List<LikedArticle>() { },
                Articles = new List<Article> { }

            });

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
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }},

                new() { Title = "Title3",
                AuthorFirstName = "AuthorFirstName3",
                AuthorLastName = "AuthorLastName3",
                Body = "Body3",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl3",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }},
            };

            _context.Articles.AddRange(articles);
            await _context.SaveChangesAsync();

            var sut = new EditorController(_unitOfWork);

            var result = sut.GetUserArticles(userId);

            Assert.NotNull(result);
        }

        [Fact]
        public async Task PostArticle_ShouldPostArticle()
        {
            // Arrange
            var sut = new EditorController(_unitOfWork);
            var article = new Article()
            {
                Id = 1,
                Title = "Title",
                AuthorFirstName = "AuthorFirstName",
                AuthorLastName = "AuthorLastName",
                Body = "Body",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }

            };

            // Act
            var result = await sut.PostArticle(article);
            await _context.SaveChangesAsync();

            // Assert
            List<Article> articles = _context.Articles.ToList();
            Assert.True(articles.Find(a => a.Id == article.Id) == article);
        }

        [Fact]
        public async Task EditArticle_ShouldEditArticle()
        {
            // Arrange
            var article = new Article()
            {
                Id = 1,
                Title = "Title",
                AuthorFirstName = "AuthorFirstName",
                AuthorLastName = "AuthorLastName",
                Body = "Body",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }
            };
            _context.Articles.Add(article);

            await _context.SaveChangesAsync();

            var sut = new EditorController(_unitOfWork);

            var existingArticle = _context.Articles.FirstOrDefault(u => u.Id == 1);

            existingArticle.Title = "TitleEdited";

            // Act
            sut.EditArticle(existingArticle);
            await _context.SaveChangesAsync();

            // Assert
            var checkArticle = _context.Articles.FirstOrDefault(a => a.Id == 1);
            Assert.True(checkArticle?.Title == "TitleEdited");
        }

        [Fact]
        public async Task DeleteArticle_ShouldDeleteArticle()
        {
            // Arrange
            var sut = new EditorController(_unitOfWork);
            var article = new Article()
            {
                Id = 1,
                Title = "Title",
                AuthorFirstName = "AuthorFirstName",
                AuthorLastName = "AuthorLastName",
                Body = "Body",
                CreatedOn = DateTime.Now,
                ImageUrl = "ImageUrl",
                AppUserId = 1,
                LikedArticles = new List<LikedArticle> { }
            };

            await _context.SaveChangesAsync();

            // Act
            sut.DeleteArticle(article.Id);

            // Assert
            List<Article> articles = _context.Articles.ToList();
            Assert.True(articles.Count == 0);
        }
    }
}
