using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mobadir_API_1.Models;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradesController : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public GradesController(Mobadr_DbContext context)
        {
            _context = context;
        }



        // GET: api/Grades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
          if (_context.Grades == null)
          {
              return NotFound();
          }
            return await _context.Grades.ToListAsync();
        }



        // PATCH: api/Grades/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateGradeVisibility(int id, [FromBody] GradeUpdateModel gradeUpdateModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            grade.IsVisible = gradeUpdateModel.IsVisible;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool GradeExists(int id)
        {
            return _context.Grades.Any(e => e.Id == id);
        }

    }

    public class GradeUpdateModel
    {
        public bool IsVisible { get; set; }
    }
}
