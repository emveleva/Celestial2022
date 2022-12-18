using API.Controllers;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celestial2022.Tests.Controllers
{
    public class ArticlesControllerTests
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CelestialDbContext _context;

        public ArticlesControllerTests()
        {
            DbContextOptionsBuilder options = new DbContextOptionsBuilder<CelestialDbContext>()
               .UseInMemoryDatabase(
                   Guid.NewGuid().ToString() // Use GUID so every test will use a different db
               );

            _context = new CelestialDbContext((DbContextOptions<CelestialDbContext>)options.Options);
            _unitOfWork = new Mock<IUnitOfWork>().Object;
        }


        [Fact]
        public async Task GetArticles_ShouldReturnArticles()
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

            var sut = new ArticlesController(_unitOfWork);

            // Act
            var result = sut.GetArticles();


            // Assert

            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetArticle_WithValidId_ShouldReturnArticle()
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

            var sut = new ArticlesController(_unitOfWork);

            // Act
            var result = sut.GetArticle(1);


            // Assert

            Assert.NotNull(result);

        }

    }
}
