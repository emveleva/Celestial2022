using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{    
    public class EditorController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public EditorController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

         // GET: api/editor
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Article>>> GetUserArticles(int id)
        {
            var articles = await _unitOfWork.ArticleRepository.GetArticles();

            return Ok(articles);
        }
        
        // GET: api/editor/5
        [HttpGet("articles/{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _unitOfWork.ArticleRepository.GetArticle(id);

            return Ok(article);
        }
        
        // POST: api/editor
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
             await _unitOfWork.EditorRepository.PostArticle(article);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to post article.");
        }

        
        // PUT: api/editor/edit/5
        [HttpPut("edit")]
        public async Task<IActionResult> EditArticle(Article article)
        {
            _unitOfWork.EditorRepository.EditArticle(article);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update article");
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(int id)
        {
            _unitOfWork.EditorRepository.DeleteArticle(id);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete article");
        }
    }
}