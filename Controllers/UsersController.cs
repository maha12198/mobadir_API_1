using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
using mobadir_API_1.Helpers;
using mobadir_API_1.Models;

namespace mobadir_API_1.Controllers
{
    //[authenticate]
    //[Authorize] // if not user is not auhtorized, error 401 (unauthorized access) 
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Mobadr_DbContext _context;

        public UsersController(Mobadr_DbContext context)
        {
            _context = context;
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
            user.UpdatedAt = DateTime.UtcNow.AddHours(4);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "user added!" });
        }



               
        //// --------------- Get User/contact Info page -------------------
        //[HttpGet]
        //[Route("get-user-info/{user_id}")]
        //public async Task<ActionResult> GetUserInfo(int user_id)
        //{
        //    var user_info = await (_context.Users
        //                        .Where(x => x.Id == user_id)
        //                        .Join(_context.LookupValues,
        //                                x => x.Role,
        //                                lval => lval.Id,
        //                                (x, lval) => new
        //                                {
        //                                    username = x.Username,
        //                                    role = lval.LookupValueName,
        //                                    updatedAt = x.UpdatedAt,
        //                                    lastVisited = x.LastVisited
        //                                })
        //                                .FirstOrDefaultAsync());
        //    if (user_info == null)
        //    {
        //        NotFound("no user found");
        //    }
        //    return Ok(user_info);
        //}


        // ------------------------ Users Page -----------------------

        // GET: api/Users/get-all-users
        [HttpGet]
        [Route("get-all-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            var users = await _context.Users
                               .Select(u => new
                               {
                                   id = u.Id,
                                   username = u.Username,
                                   role = u.UserRole.ToString(),
                                   updatedAt = u.UpdatedAt,
                                   lastVisited = u.LastVisited
                               })
                               .ToListAsync();

            return Ok(users);
        }


        // PUT: api/Users/Edit-Username
        [HttpPut]
        [Route("edit-username")]
        public async Task<IActionResult> PutUser([FromBody] Edit_user_obj edit_user_obj)
        {
            if (edit_user_obj == null )
            {
                return BadRequest();
            }

            int user_id = edit_user_obj.Id;
            var user = _context.Users.FirstOrDefault(u => u.Id == user_id);
            
            user!.Username = edit_user_obj.New_Username;
            user.UpdatedAt = DateTime.UtcNow.AddHours(4);  //update updatedAt value (oman time : GMT+4)

            await _context.SaveChangesAsync();
            
            return Ok(new { message = "username edited sucessfully !" });
        }


        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "username deleted sucessfully !" });
        }


        // "Change Password" **checks the old password**
        // PATCH: api/Users/PatchUserPassword/{userId:---}
        [HttpPatch("PatchUserPassword/{userId}")]
        public IActionResult PatchUserPassword(int userId, [FromBody] ChangePasswordRequest changePasswordRequest)
        {
            // Check if the user ID is valid
            if (!UserExists(userId))
            {
                return BadRequest("Invalid user ID.");
            }

            // Get the user from the database
            var user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            // Check if the old password is correct
            if (!IsCorrectPassword(user!, changePasswordRequest.OldPassword))
            {
                return BadRequest("The old password is incorrect.");
            }

            // Change the user's password to the new one
            //user!.Password = changePasswordRequest.NewPassword;
            // encryption of password
            user!.Password = PasswordHasher.HashPassword(changePasswordRequest.NewPassword);

            // Update the user in the data source
            //_context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            // Return a success response
            return Ok(new { message = "Password changed successfully."});
            }

        // checks if the old password entered by user is correct or not
        private bool IsCorrectPassword(User user, string oldPassword)
        {
            if ((user == null) || (oldPassword == null))
            {
                return false;
            }
            else
            {
                // password: not encrypted (entered by user) , base64Hash: encrypted (stored in DB)
                if (PasswordHasher.VerifyPassword(oldPassword, user.Password))
                {
                    //return Ok("the old password is correct"); 
                    Console.WriteLine("the old passowrd correct"); //test
                    return true;
                }

                Console.WriteLine("the old passowrd incorrect"); //test
                return false;
            }
        }

        // checks if user exists
        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }






        //------------------------------------- Contact Info -----------------------------
        // GET: api/Users/GetContactInfo
        [HttpGet]
        [Route("GetContactInfo")]
        public ActionResult<ContactInfo> GetContactInfo()
        {
            var contactInfo = _context.ContactInfos.FirstOrDefault();

            if (contactInfo == null)
            {
                return NotFound("No contact information found");
            }

            return Ok(contactInfo);
        }

        // PUT: api/Users/phone/{phoneNo}
        [HttpPut("phone/{phoneNo}")]
        public IActionResult SetPhoneNo(int phoneNo)
        {
            var contactInfo = _context.ContactInfos.FirstOrDefault() ?? new ContactInfo();
            contactInfo.PhoneNo = phoneNo;

            if (contactInfo.Id == 0)
            {
                _context.ContactInfos.Add(contactInfo);
            }

            _context.SaveChanges();

            return Ok(new { message = "Phone number set successfully" });
        }

        // PUT: api/Users/email/{email}
        [HttpPut("email/{email}")]
        public IActionResult SetEmail(string email)
        {
            var contactInfo = _context.ContactInfos.FirstOrDefault() ?? new ContactInfo();
            contactInfo.Email = email;

            if (contactInfo.Id == 0)
            {
                _context.ContactInfos.Add(contactInfo);
            }

            _context.SaveChanges();

            return Ok(new { message = "Email set successfully" });
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




    public class Edit_user_obj
    {
        public Edit_user_obj(int id, string new_Username)
        {
            Id = id;
            New_Username = new_Username;
        }

        public int Id { get; set; }
        public string New_Username { get; set; }
    }

    

    
    //-- define a custom request object called "ChangePasswordRequest"
    public class ChangePasswordRequest
    {
        public ChangePasswordRequest(string oldPassword, string newPassword)
        {
            OldPassword = oldPassword;
            NewPassword = newPassword;
        }

        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }


}
