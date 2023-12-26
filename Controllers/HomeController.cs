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

        // Get all Visible Grades
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





    }
}
