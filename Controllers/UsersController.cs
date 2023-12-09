using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mobadir_API_1.Helpers;
using mobadir_API_1.Models;

namespace mobadir_API_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public UsersController(Mobadr_DbContext context)
        {
            _context = context;
        }


        //         LOGIN
        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult> login([FromBody] UserLoginRequest userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userObj.Username);

            if (user == null)
            {
                // User not found
                //return NotFound(new { message = "User not found" });
                return NotFound("عذراً ،اسم المستخدم الذي أدخلته غير صحيح");
            }

            // Verify password
            if (PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                // Password is correct
                // Generate and return a token, set authentication cookie, etc.
                // Example: user.Token = GenerateToken();
                // ...

                //return Ok(new { message = "Login successful", token = user.Token });
                return Ok(new { message = "Login successful"});
            }
            else
            {
                // Password is incorrect
                //return Unauthorized(new { message = "Incorrect password" });
                return NotFound("عذراً ،كلمة السر التي أدخلتها غير صحيحة");
            }

            //var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userObj.Username
            //&& u.Password == userObj.Password);

            //if (user == null)
            //{
            //    var userByUsername = await _context.Users.FirstOrDefaultAsync(u => u.Username == userObj.Username);
            //    if (userByUsername != null)
            //    {
            //        // Username is correct, but password is incorrect
            //        return NotFound("عذراً ،كلمة السر التي أدخلتها غير صحيحة");
            //    }
            //    else
            //    {
            //        // Username is incorrect
            //        return NotFound("عذراً ،اسم المستخدم الذي أدخلته غير صحيح");
            //    }
            //}

            //// Login successful
            //return Ok(new { message = "Login Success!" });
        }


        //        SIGNUP
        // POST: api/Users/signup
        [HttpPost]
        [Route("signup")]
        public async Task<ActionResult> PostUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            // encryption of password
            user.Password = PasswordHasher.HashPassword(user.Password);

            //user.Token = "";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "user added!" });
        }


        //       User/contact Info
        [HttpGet]
        [Route("get-user-info/{user_id}")]
        public async Task<ActionResult> GetUserInfo(int user_id)
        {
            
            var user_info = await (_context.Users
                                .Where(x => x.Id == user_id)
                                .Join(_context.LookupValues,
                                        x => x.Role,
                                        lval => lval.Id,
                                        (x, lval) => new
                                        {
                                            username = x.Username,
                                            role = lval.LookupValueName,
                                            updatedAt = x.UpdatedAt
                                        })
                                        .FirstOrDefaultAsync());

            if (user_info == null)
            {
                NotFound("no user found");
            }

            return Ok(user_info);
        }






















        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //  if (_context.Users == null)
        //  {
        //      return NotFound();
        //  }
        //    var user = await _context.Users.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }











    //-- define a custom request object called "UserLoginRequest"
    public class UserLoginRequest
    {
        public UserLoginRequest(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public string Username { get; set; }
        public string Password { get; set; }
    }


    //-- define a custom request object called "ChangePasswordRequest"
    //public class ChangePasswordRequest
    //{
    //    public ChangePasswordRequest(string oldPassword, string newPassword)
    //    {
    //        OldPassword = oldPassword;
    //        NewPassword = newPassword;
    //    }

    //    public string OldPassword { get; set; }
    //    public string NewPassword { get; set; }
    //}


}
