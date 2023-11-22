using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mobadir_API.Models;
using mobadir_API_1.Models;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly Mobadr_DBContext _context;

        public ArticlesController(Mobadr_DBContext context)
        {
            _context = context;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            return await _context.Articles.ToListAsync();
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
          if (_context.Articles == null)
          {
              return NotFound();
          }
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }








        // POST: api/Articles/addarticle
        [HttpPost]
        [Route("addarticle")]
        public async Task<ActionResult<Article>> PostArticle( [FromBody] Article article)
        {
            if (_context.Articles == null)
            {
                return Problem("Entity set 'Mobadr_DBContext.Articles'  is null.");
            }

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            //return Ok(article);
            return Ok();
        }


        //public async Task<ActionResult<Article>> PostArticle(string body)
        //{
        //    if (_context.Articles == null)
        //    {
        //        return Problem("Entity set 'Mobadr_DBContext.Articles'  is null.");
        //    }

        //    // Create a new Article instance and set its properties
        //    Article newArticle = new Article
        //    {
        //        Body = body

        //    };

        //    _context.Articles.Add(newArticle);
        //    await _context.SaveChangesAsync();

        //    return Ok(newArticle);
        //   
        //}


        //[HttpPost]
        //public async Task<ActionResult<Article>> PostArticle(Article article)
        //{
        //  if (_context.Articles == null)
        //  {
        //      return Problem("Entity set 'Mobadr_DBContext.Articles'  is null.");
        //  }

        //    _context.Articles.Add(article);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        //}













        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            if (_context.Articles == null)
            {
                return NotFound();
            }
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return (_context.Articles?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
