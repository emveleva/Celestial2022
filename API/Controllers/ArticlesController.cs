using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly CelestialDbContext _context;

        public ArticlesController(CelestialDbContext context)
        {
            _context = context;
        }

        // GET: api/articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }
        

        // PUT: api/articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticles(int id, Article article)
        {
            if(id!=article.Id)
            {
                return BadRequest();
            }
            _context.Entry(article).State = EntityState.Modified;

                await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var Articles = await _context.Articles.FindAsync(id);

            if (Articles == null)
            {
                return NotFound();
            }

            return Articles;
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticles(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticles", new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(int id)
        {
            var Articles = await _context.Articles.FindAsync(id);
            if (Articles == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(Articles);
            await _context.SaveChangesAsync();

            return Articles;
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}