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
                                              .Include(t => t.Content)
                                              .Include(t => t.Files)
                                              .Include(t => t.Questions)
                                              .ToListAsync();

            if (topics == null || !topics.Any())
            {
                return NotFound("No topics were found for this subject");
            }

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
        // GET: api/Home/GetSubjectGradeName/{subject_id}
        [HttpGet]
        [Route("GetSubjectGradeName/{subject_id}")]
        public async Task<ActionResult> GetSubjectGradeName(int? subject_id)
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
                                          GradeName = subject.Grade!.Name
                                      })
                                      .FirstOrDefaultAsync();
            if (infoToAddTopic == null)
            {
                NotFound("no data was found");
            }
            return Ok(infoToAddTopic);
        }



        // -------------------------- Get Topic Data in topic page ---------------------
        // GET: api/Home/GetTopic/{topic_id}
        [HttpGet]
        [Route("GetTopic/{topic_id}")]
        public async Task<ActionResult<Topic>> GetTopic(int? topic_id)
        {
            if (topic_id == null)
            {
                return BadRequest("passed topic id is null!");
            }

            var topic = await _context.Topics.Where(t => t.Id == topic_id)
                                              .Include(t => t.Content)
                                              .Include(t => t.Files)
                                              .Include(t => t.Questions)
                                              .Select(t=> new 
                                                  { id = t.Id,
                                                    title = t.Title,
                                                    content = t.Content,
                                                    videoUrl = t.VideoUrl,
                                                    //questions = t.Questions,
                                                    files = t.Files,
                                                    Has_questions = t.Questions.Any()  })
                                              .FirstOrDefaultAsync();

            if (topic == null)
            {
                return NotFound("No topic was found");
            }

            return Ok(topic);
        }






        // ------------------------------ Get topic title
        // GET: api/Home/Get_Title_of_Topic/{topic_id}
        [HttpGet("Get_Title_of_Topic/{topic_id}")]
        public async Task<object> Get_Title_of_Topic(int? topic_id)
        {
            try
            {
                if (topic_id == null)
                {
                    return NotFound("topic_id is null");
                }

                var topic_title = await _context.Topics.Where(t => t.Id == topic_id)
                                                       .Select(t => t.Title)
                                                       .FirstOrDefaultAsync();

                if (topic_title == null)
                {
                    return NotFound("No title found for this topic");
                }

                return Ok(new { title = topic_title });
            }
            catch
            {
                // Log the exception for debugging purposes
                //Console.WriteLine($"Exception: {ex.Message}");

                // Return a generic error message
                return StatusCode(500, new { error = "Internal server error" });
            }
        }



        // ------------------------------ Get Questions of topic
        // GET: api/Home/Get_Questions_of_Topic/{topic_id}
        [HttpGet("Get_Questions_of_Topic/{topic_id}")]
        public async Task<ActionResult<IEnumerable< Question>>> Get_Questions_of_Topic(int? topic_id)
        {
            if (topic_id == null)
            {
                return NotFound("topic_id is null");
            }

            var questions = await _context.Questions.Where(q => q.TopicId == topic_id)
                                                    .Select(t=> new
                                                    {
                                                        answer = MapChoiceNumberToValue(t.Answer, t.Choice1, t.Choice2, t.Choice3, t.Choice4),
                                                        options = new[] { t.Choice1, t.Choice2, t.Choice3, t.Choice4 },
                                                        id = t.Id,
                                                        imagePath = t.ImageUrl,
                                                        question = t.QuestionText
                                                    })
                                                    .ToListAsync();

            if (questions == null)
            {
                return NotFound("No questions were found for this topic");
            }

            return Ok(questions);
        }

        // to map the int number in answer to the corresponding string value of choices
        private static string MapChoiceNumberToValue(int? answer, string? choice1, string? choice2, string? choice3, string? choice4)
        {
            switch (answer)
            {
                case 1:
                    return choice1!;
                case 2:
                    return choice2!;
                case 3:
                    return choice3!;
                case 4:
                    return choice4!;
                default:
                    return string.Empty; 
            }
        }






    }
}
