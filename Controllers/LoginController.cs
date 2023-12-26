using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mobadir_API_1.Models;
using mobadir_API_1.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly Mobadr_DbContext _context;

        public LoginController(Mobadr_DbContext context)
        {
            _context = context;
        }


        //         LOGIN
        // POST: api/Login/login
        [HttpPost("login")]
        public async Task<ActionResult> login([FromBody] UserLoginRequest userObj)
        {
            try
            {
                if (userObj == null)
                    return BadRequest();

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userObj.Username);

                if (user == null)
                {
                    // User not found
                    return NotFound("عذراً ،اسم المستخدم الذي أدخلته غير صحيح");
                }

                // Verify password
                if (PasswordHasher.VerifyPassword(userObj.Password, user.Password))
                {
                    // Password is correct, so Generate a token
                    var genToken = CreateJWT(user);
                    user.Token = genToken;

                    //update lastVisited value
                    user.LastVisited = DateTime.Now;
                    _context.SaveChanges();

                    // return the token value and sucess message
                    return Ok(new
                    {
                        user_id = user.Id,
                        token = user.Token,
                        message = "تم تسجيل الدخول بنجاح"
                    });
                }
                else
                {
                    // Password is incorrect
                    return NotFound("عذراً ،كلمة السر التي أدخلتها غير صحيحة");
                }
            }

            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Exception: {ex.Message}");

                // Return a custom error message
                return StatusCode(500, "حدث خطأ أثناء معالجة الطلب في نقطة الوصول");
            }
        }


        // create JWT Token for Authentication
        private string CreateJWT(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var jwtTokenHandler = new JwtSecurityTokenHandler();

            // Use a secure, randomly generated key, !!!!!!! should be changed in production phase
            var key = Encoding.ASCII.GetBytes("your_secure_secret_key");

            var identity = new ClaimsIdentity(new Claim[]
            {
                // the data that we want to store in the token ( in my case: user and role)
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                // Set an expiration time for the token - 4 hours
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}
