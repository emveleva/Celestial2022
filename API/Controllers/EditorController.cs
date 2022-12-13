using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class EditorController : BaseApiController
    {
        private readonly CelestialDbContext _context;

        public EditorController(CelestialDbContext context)
        {
            _context = context;
        }

         // GET: api/editor
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Article>>> GetUserArticles(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.Articles)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid user ID");
            }

            return user.Articles
                .Select(a => new Article()
                {
                    Id = a.Id,
                    Title = a.Title,
                    AuthorFirstName = a.AuthorFirstName,
                    AuthorLastName = a.AuthorLastName,
                    Body = a.Body,
                    CreatedOn = a.CreatedOn,
                    ImageUrl = a.ImageUrl,
                    AppUserId = a.AppUserId

                }).ToList();

        }
        
        // GET: api/editor/5
        [HttpGet("articles/{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }
        
        // POST: api/editor
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticles(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticles", new { id = article.Id }, article);
        }

        
        // PUT: api/editor/edit/5
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            if(id!=article.Id)
            {
                return BadRequest();
            }
            _context.Entry(article).State = EntityState.Modified;

                await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return article;
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}