using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   [Authorize]
    public class UsersController : BaseApiController
    {
       private readonly IArticleService articleService;

        public UsersController(IArticleService _articleService)
        {
            _articleService = articleService;
        }

        [HttpPost("{userId}/liked")]
        public async Task<ActionResult> AddToLiked(int articleId, int userId)
        {

            await articleService.AddToLiked(articleId, userId);
            
            return Ok();
        }

        [HttpGet("{id}/liked")]

        public async Task<ActionResult<IEnumerable<Article>>> GetLikedArticles(int id)
        {
            var articles = await articleService.GetLikedArticles(id);

            return Ok(articles);
        }

        [HttpDelete("{id}/liked/{articleId}")]

        public async Task<ActionResult> RemoveFromLiked(int articleId, int id)
        {
            await articleService.RemoveFromLiked(articleId, id);

            return Ok();
        }
    }
}