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

namespace Celestial2022.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CelestialDbContext _context;

        public UserControllerTests()
        {
            DbContextOptionsBuilder options = new DbContextOptionsBuilder<CelestialDbContext>()
               .UseInMemoryDatabase(
                   Guid.NewGuid().ToString() // Use GUID so every test will use a different db
               );

            _context = new CelestialDbContext((DbContextOptions<CelestialDbContext>)options.Options);
            _unitOfWork = new Mock<IUnitOfWork>().Object;
        }

        [Fact]
        public async Task AddToLiked_ShouldAddArticleToUserLiked()
        {
            // Arrange
            var user = new AppUser
            {
                Id = 1,
                Email = "Email",
                FirstName = "FirstName",
                LastName = "LastName",
                LikedArticles = new List<LikedArticle> { }
            };
            var article = new Article
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

            var likedArticle = new LikedArticle()
            {
                AppUser = user,
                UserId = user.Id,
                ArticleId = article.Id,
                Article = article
            };
            _context.Articles.Add(article);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var sut = new UsersController(_unitOfWork);

            // Act
            await sut.AddToLiked(likedArticle);
            await _context.SaveChangesAsync();

            // Assert

            var likedArticles = _context.LikedArticles.ToList();
            Assert.True(likedArticles.Count == 1);
            Assert.True(likedArticle.Article.Title == "Title");
            Assert.Single(likedArticles);
        }

        [Fact]
        public async Task GetUserLikedArticles_ShouldReturn_UserLikedArticles()
        {
            // Arrange
            var user = new AppUser
            {
                Id = 1,
                Email = "Email",
                FirstName = "FirstName",
                LastName = "LastName",
                LikedArticles = new List<LikedArticle> { }
            };
            var article = new Article
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

            var likedArticle = new LikedArticle()
            {
                AppUser = user,
                UserId = user.Id,
                ArticleId = article.Id,
                Article = article
            };
            _context.Articles.Add(article);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var sut = new UsersController(_unitOfWork);

            // Act


            var result = sut.GetLikedArticles(user.Id);

            Assert.NotNull(result);
        }


        [Fact]
        public async Task RemoveArticle_WithCorrectId_ShouldRemoveArticle()
        {
            // Arrange
            var user = new AppUser
            {
                Id = 1,
                Email = "Email",
                FirstName = "FirstName",
                LastName = "LastName",
                LikedArticles = new List<LikedArticle> { }
            };
            var article = new Article
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

            var likedArticle = new LikedArticle()
            {
                AppUser = user,
                UserId = user.Id,
                ArticleId = article.Id,
                Article = article
            };
            _context.Articles.Add(article);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var sut = new UsersController(_unitOfWork);


            // Act
            sut.RemoveFromLiked(likedArticle.ArticleId, likedArticle.UserId);
            await _context.SaveChangesAsync();

            // Assert
            List<LikedArticle> articles = _context.LikedArticles.ToList();
            Assert.True(articles.Count == 0);
        }

        [Fact]
        public async Task GetUser_WithValidId_ShouldReturnUser()
        {
            // Arrange
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
            await _context.SaveChangesAsync();

            var sut = new UsersController(_unitOfWork);

            // Act
            var result = sut.GetUser(userId);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task EditProfile_ShouldCorrectlyEditUserProfile()
        {
            // Arrange
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
            await _context.SaveChangesAsync();

            var sut = new UsersController(_unitOfWork);

            var existingUser = _context.Users.FirstOrDefault(u => u.Id == 1);

            existingUser.FirstName = "EditedFirstName";
            existingUser.LastName = "EditedLastName";

            // Act
            sut.UpdateUserProfile(existingUser);


            // Assert
            var checkUser = _context.Users.FirstOrDefault(a => a.Id == 1);
            Assert.True(checkUser?.FirstName == "EditedFirstName");
            Assert.True(checkUser?.LastName == "EditedLastName");
        }
    }
}
