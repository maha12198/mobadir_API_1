﻿using System;
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
    public class SubjectsController : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public SubjectsController(Mobadr_DbContext context)
        {
            _context = context;
        }

        // -------------------------- get subjects by grade id passed --------------
        // GET: api/Subjects/get-subjects-by-grade/{grade_id}
        [HttpGet]
        [Route("get-subjects-by-grade/{grade_id}")]
        public async Task<ActionResult<IEnumerable<Subject>>> Get_Subjects_By_GradeId(int? grade_id)
        {
            if (grade_id == null)
            {
                return BadRequest("the grade id is null");
            }

            var subjects = await _context.Subjects.Where(s => s.GradeId == grade_id).ToListAsync();

            if ( subjects == null)
            {
                return NotFound("No subjects were found for this grade");
            }
           
            return Ok(subjects);    
        }



        // -------------------------- change visibility of subject ---------------------
        // PATCH: api/Subjects/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateSubjectVisibility(int id, [FromBody] SubjectUpdateModel subjectUpdateModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound();
            }

            subject.IsVisible = subjectUpdateModel.IsVisible;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
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

        private bool SubjectExists(int id)
        {
            return _context.Subjects.Any(e => e.Id == id);
        }



        // -------------------------- Add new subject ---------------------
        // POST: api/Subjects
        [HttpPost]
        public async Task<ActionResult<Subject>> PostSubject([FromBody]AddSubjectModel subject)
        {
            if (subject == null)
            {
                return BadRequest("subject is null.");
            }

            var newSubject = new Subject
            {
                GradeId = subject.gradeId,
                Name = subject.name,
                IsVisible = subject.IsVisible
            };

            _context.Subjects.Add(newSubject);

            await _context.SaveChangesAsync();

            return Ok(new { message = "subject added!" });
        }




        // -------------------------- Edit subject name ---------------------
        // PATCH: api/Subjects/EditSubjectName/{id}
        [HttpPatch("EditSubjectName/{id}")]
        public async Task<IActionResult> EditSubjectName(int id, [FromBody]SubjectUpdateNameModel subjectUpdateNameModel)
        {
            if (string.IsNullOrWhiteSpace(subjectUpdateNameModel.new_subject_name))
            {
                return BadRequest("New subject name cannot be empty or null.");
            }

            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound("Subject not found.");
            }

            subject.Name = subjectUpdateNameModel.new_subject_name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Subject name updated successfully!" });
        }


    }


    public class SubjectUpdateModel
    {
        public bool IsVisible { get; set; }
    }

    public class AddSubjectModel
    {
        public int gradeId { get; set; }
        public bool IsVisible { get; set; }
        public string name { get; set; }
    }

    public class SubjectUpdateNameModel
    {
        public string new_subject_name { get; set; }
    }
}
