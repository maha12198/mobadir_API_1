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
    public class Topics1Controller : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public Topics1Controller(Mobadr_DbContext context)
        {
            _context = context;
        }



        // -------------------------- Get All Topics of the selected Subject ---------------------
        // GET: api/Topics1/GetAllTopics/{subject_id}
        [HttpGet]
        [Route("GetAllTopics/{subject_id}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetAllTopics(int? subject_id)
        {
            if (subject_id == null)
            {
                return BadRequest("passed subject id is null!");
            }

            var topics = await _context.Topics.Where(t => t.SubjectId == subject_id).Include(u=>u.CreatedByNavigation).Include(u=>u.Subject).ToListAsync();

            if (topics == null || !topics.Any())
            {
                return NotFound("No topics were found for this subject");
            }

            // Map the integer Term property to the string representation using TopicTerm property
            var topicsWithTermString = topics.Select(topic =>
            {
                var topicDto = new
                {
                    topic.Id,
                    topic.Title,
                    topic.IsVisible,
                    topic.UpdatedAt,
                    topic.CreatedAt,
                    topic.VideoUrl,
                    Term = topic.TopicTerm.ToString(), // Get the string representation of Term
                    topic.SubjectId,
                    Username = topic.CreatedByNavigation?.Username,
                    //topic.ContentId
                };
                return topicDto;
            });

            return Ok(topicsWithTermString);
        }



        // -------------------------- change visibility of subject ---------------------
        // PATCH: api/Topics1/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateSubjectVisibility(int id, [FromBody] TopicUpdateModel topicUpdateModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topic = await _context.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            topic.IsVisible = topicUpdateModel.IsVisible;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
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

        private bool TopicExists(int id)
        {
            return (_context.Topics?.Any(e => e.Id == id)).GetValueOrDefault();
        }



        // -------------------------- Get subject name and grade name by subject id ---------------------
        // GET: api/Topics1/GetAddTopicData/{subject_id}
        [HttpGet]
        [Route("GetAddTopicData/{subject_id}")]
        public async Task<ActionResult> GetAddTopicData(int? subject_id)
        {
            if (subject_id == null)
            {
                return BadRequest("passed subject id is null!");
            }

            var infoToAddTopic = await _context.Subjects
                                      .Where(t => t.Id == subject_id)
                                      .Include(u => u.Grade)
                                      .Select(subject => new
                                      {
                                          SubjectName = subject.Name,
                                          GradeName = subject.Grade.Name
                                      })
                                      .FirstOrDefaultAsync();

            if (infoToAddTopic == null)
            {
                NotFound("no data was found");
            }

            return Ok(infoToAddTopic);
        }

        // POST: api/Topics1
        [HttpPost]
        public async Task<ActionResult<Topic>> PostTopic([FromBody] Topic topic)
        {
            // Data needed: title - isVisible - CreatedAt - VideoUrl - Term - SubjectId - CreatedBy

            topic.IsVisible = true;
            topic.CreatedAt = DateTime.UtcNow.AddHours(4);

            //Console.WriteLine("test new topic here: ", topic);

            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Topic Added Sucessfully" });
            
        }















        // GET: api/Topics1/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Topic>> GetTopic(int id)
        //{
        //  if (_context.Topics == null)
        //  {
        //      return NotFound();
        //  }
        //    var topic = await _context.Topics.FindAsync(id);

        //    if (topic == null)
        //    {
        //        return NotFound();
        //    }

        //    return topic;
        //}

        // PUT: api/Topics1/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTopic(int id, Topic topic)
        //{
        //    if (id != topic.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(topic).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TopicExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
    }

    public class TopicUpdateModel
    {
        public bool IsVisible { get; set; }
    }
}
