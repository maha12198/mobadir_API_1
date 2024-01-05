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


        // -------------------------- Add NEW TOPIC with all relevant data  ---------------------
        // POST: api/Topics1/AddTopic
        [HttpPost]
        [Route("AddTopic")]
        public async Task<ActionResult<Topic>> PostTopic([FromBody] AddTopicModel? topicModel)
        {
            if (topicModel == null) { 
                return BadRequest("passed topic model is null"); 
            }

            if (topicModel.new_content != null)
            {
                // -----  Add new content
                var topicContent = new TopicContent
                {
                    Content = topicModel.new_content,
                };
                // Associate content with the topic
                topicModel.new_topic.Content = topicContent;
            }

            // ----- Add Files
            // iterate over the 'files' collection and add each file to the database
            topicModel.new_topic.Files = new List<Models.File>();
            foreach (var file in topicModel.passed_files)
            {
                topicModel.new_topic.Files.Add(file);
            }

            // ----- Add Questions
            // iterate over the 'questions' collection and add each question to the database
            topicModel.new_topic.Questions = new List<Models.Question>();
            foreach (var ques in topicModel.passed_questions)
            {
                topicModel.new_topic.Questions.Add(ques);
            }
            try
            {
                _context.Topics.Add(topicModel.new_topic);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Handle database update exception
                return StatusCode(500, "Error saving to the database");
            }

            return Ok();
        }


        // ------------------------------------- Edit Topic -----------------------------
        // ------------------------------ Get Topic Data
        // GET: api/Topics1/Get_EditTopic_Data/{id}
        [HttpGet("Get_EditTopic_Data/{topic_id}")]
        public async Task<ActionResult<EditTopicDataModel>> GetEditDataForTopic(int topic_id)
        {
            var topic = await _context.Topics.Where(t=>t.Id == topic_id).Include(t=>t.Content).Include(t=>t.Files).Include(t=>t.Questions).FirstOrDefaultAsync();
            if (topic == null)
            {
                return NotFound("No topic found with this topic id");
            }
            return Ok(topic);
        }




        // PUT: api/Topics1/{topic_id}
        [HttpPut("{topic_id}")]
        public async Task<IActionResult> PutTopic(int topic_id, [FromBody] Topic topic)
        {
            if (topic_id != topic.Id)
            {
                return BadRequest("topic_id does not match the topic id to be updated");
            }

            // Retrieve the existing topic including related entities
            var existingTopic = await _context.Topics
                .Include(t=>t.Content)
                .Include(t => t.Files)
                .Include(t => t.Questions)
                .FirstOrDefaultAsync(t => t.Id == topic_id);

            if (existingTopic == null)
            {
                return NotFound("No topic was found with this id");
            }

            // Update the properties of the existing topic
            _context.Entry(existingTopic).CurrentValues.SetValues(topic);

            // update updated_at value
            existingTopic.UpdatedAt = DateTime.Now;

            // Update related entities, assuming Content is a complex type
            if (existingTopic.Content != null)
            {
                if (topic.Content == null || topic.Content.Content == null)
                {
                    // If the new content is null, remove the existing content
                    _context.TopicContents.Remove(existingTopic.Content);
                }
                else
                {
                    // Update the properties of the existing content
                    _context.Entry(existingTopic.Content).CurrentValues.SetValues(topic.Content);
                }
            }
            else
            {
                // If there is no existing content, but the new content is not null, add the new content
                if (topic.Content != null && topic.Content.Content != null)
                {
                    existingTopic.Content = topic.Content;
                }
            }

            // ---------------- Update related entities
            // Update Files
            foreach (var existingFile in existingTopic.Files.ToList())
            {
                var updatedFile = topic.Files.FirstOrDefault(f => f.Id == existingFile.Id);
                if (updatedFile != null)
                {
                    _context.Entry(existingFile).CurrentValues.SetValues(updatedFile);
                }
                else
                {
                    // File has been removed in the updated topic, so remove it
                    _context.Files.Remove(existingFile);
                }
            }
            // Add new Files
            foreach (var newFile in topic.Files.Where(f => f.Id == 0))
            {
                existingTopic.Files.Add(newFile);
            }


            // Update Questions
            foreach (var existingQuestion in existingTopic.Questions.ToList())
            {
                var updatedQuestion = topic.Questions.FirstOrDefault(f => f.Id == existingQuestion.Id);
                if (updatedQuestion != null)
                {
                    _context.Entry(existingQuestion).CurrentValues.SetValues(updatedQuestion);
                }
                else
                {
                    // File has been removed in the updated topic, so remove it
                    _context.Questions.Remove(existingQuestion);
                }
            }
            // Add new Files
            foreach (var newQuestion in topic.Questions.Where(f => f.Id == 0))
            {
                existingTopic.Questions.Add(newQuestion);
            }



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(topic_id))
                {
                    return NotFound("No topic was found with this id");
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Topic Updated Sucessfully!" });
        }




        // DELETE: api/Topics1/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            var topic = await _context.Topics.Include(t => t.Content)    
                                             .Include(t => t.Files)    
                                             .Include(t => t.Questions)
                                             .FirstOrDefaultAsync(t => t.Id == id);

            if (topic == null)
            {
                return NotFound();
            }

            // Remove related entities
            if (topic.Content != null)
            {
                _context.TopicContents.Remove(topic.Content);
            }

            if (topic.Files != null && topic.Files.Any())
            {
                _context.Files.RemoveRange(topic.Files);
            }

            if (topic.Questions != null && topic.Questions.Any())
            {
                _context.Questions.RemoveRange(topic.Questions);
            }

            // Remove the topic
            _context.Topics.Remove(topic);


            await _context.SaveChangesAsync();

            return Ok(new { message = "topic deleted sucessfully !" });
        }
















    }

    public class TopicUpdateModel
    {
        public bool IsVisible { get; set; }
    }


    public class AddTopicModel
    {
        public AddTopicModel(Topic New_topic, string New_content)
        {
            new_topic = New_topic;
            new_content = New_content;
        }

        public Topic? new_topic { get; set; }
        public string? new_content { get; set; }
        public Models.File[] passed_files { get; set; }
        public Question[] passed_questions { get; set; }
    }

    public class EditTopicDataModel
    {
        public Topic Topic { get; set; }
        public TopicContent Content { get; set; }
        public List<Models.File> Files { get; set; }
        public List<Question> Questions { get; set; }
    }




}
