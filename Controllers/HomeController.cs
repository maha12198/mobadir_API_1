using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mobadir_API_1.Models;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public HomeController(Mobadr_DbContext context)
        {
            _context = context;
        }


        //------------------------------------- Contact Info -----------------------------
        // GET: api/Home/GetContactInfo          // duplicated?
        [HttpGet]
        [Route("GetContactInfo")]
        public ActionResult<ContactInfo> GetContactInfo()
        {
            var contactInfo = _context.ContactInfos.FirstOrDefault();

            if (contactInfo == null)
            {
                return NotFound("No contact information found");
            }

            // PhoneNo, Email
            return Ok(contactInfo);
        }

        // ------------------------------ Get all Visible Grades -----------------------------
        // GET: api/Home/Get_all_grades
        [HttpGet]
        [Route("Get_all_grades")]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
            if (_context.Grades == null)
            {
                return NotFound();
            }

            // get only the visible grades
            var visible_grades = await _context.Grades.Where(g => g.IsVisible == true).ToListAsync();

            return Ok(visible_grades);
        }


        // ------------------------ Get visible subjects by grade id passed -------------------
        // GET: api/Home/get-subjects-by-grade/{grade_id}
        [HttpGet]
        [Route("get-subjects-by-grade/{grade_id}")]
        public async Task<ActionResult<IEnumerable<Subject>>> Get_Subjects_By_GradeId(int? grade_id)
        {
            if (grade_id == null)
            {
                return BadRequest("the grade id is null");
            }

            var subjects = await _context.Subjects.Where(s => s.GradeId == grade_id && s.IsVisible == true).ToListAsync();

            if (subjects == null)
            {
                return NotFound("No subjects were found for this grade");
            }

            return Ok(subjects);
        }



        // -------------------------- Get Visible Topics of the selected Subject ---------------------
        // GET: api/Home/GetAllTopics/{subject_id}
        [HttpGet]
        [Route("GetAllTopics/{subject_id}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetAllTopics(int? subject_id)
        {
            if (subject_id == null)
            {
                return BadRequest("passed subject id is null!");
            }

            var topics = await _context.Topics.Where(t => t.SubjectId == subject_id && t.IsVisible == true)
                                              .Include(u => u.CreatedByNavigation)
                                              .Include(t => t.Content)
                                              .Include(t => t.Files)
                                              .Include(t => t.Questions)
                                              .ToListAsync();

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
                    Term = topic.TopicTerm.ToString(), // Get the string representation of Term
                    Has_content = topic.Content !=null,
                    Has_videoUrl = !string.IsNullOrEmpty(topic.VideoUrl),
                    Has_questions = topic.Questions.Any(),
                    Has_files = topic.Files.Any(),
                    //topic.IsVisible,
                    //topic.UpdatedAt,
                    //topic.CreatedAt,
                    //topic.VideoUrl,
                    //topic.SubjectId,
                    //Username = topic.CreatedByNavigation?.Username,
                };
                return topicDto;
            });

            return Ok(topicsWithTermString);
        }

        // -------------------------- Get subject name and grade name by subject id ---------------------
        // GET: api/Home/GetTopicData/{subject_id}
        [HttpGet]
        [Route("GetTopicData/{subject_id}")]
        public async Task<ActionResult> GetTopicData(int? subject_id)
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




    }
}
