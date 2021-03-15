using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private UserContext _userContext;

        public UserProfileController(UserManager<ApplicationUser> userManager, UserContext userContext)
        {
            _userManager = userManager;
            _userContext = userContext;
        }

        [HttpPost]
        [Route("GetUserProfileByName")]
        public async Task<ApplicationUser> GetUserByName()
        {
            var request = HttpContext.Request;

            return await _userManager.FindByNameAsync(request.Form.Keys.First());
        }

        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize]
        [Route("GetUserProfile")]
        //GET: api/GetUserProfile
        public async Task<Object> GetUserProfile()
        {
            var claims = User.Claims;
            var ListClaims = claims.ToList();
            if (ListClaims.Count != 0)
            {
                var prvi = ListClaims.First();

                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                string userId = prvi.Value;
                var user = await _userManager.FindByIdAsync(userId);    // ovde dobro radi
                if (user.TipKorisnika == "AvioAdmin")
                {
                    AvioAdmin admin = user as AvioAdmin;
                    return new
                    {
                        user.UserName,
                        user.Email,
                        user.Name,
                        user.Lastname,
                        user.Grad,
                        user.PhoneNumber,
                        user.BrojPasosa,
                        user.TipKorisnika,
                        admin.NazivAviokompanije
                    };
                }

                else
                {
                    return new
                    {
                        user.UserName,
                        user.Email,
                        user.Name,
                        user.Lastname,
                        user.Grad,
                        user.PhoneNumber,
                        user.BrojPasosa,
                        user.TipKorisnika
                    };
                }

            }
            else
            {
                return "Ni jedan korisnik nije ulogovan";
            }
        }
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<ActionResult<bool>> ChangePassword()
        {
            var request = HttpContext.Request.Form.Keys.ToList<string>();
            var username = request[0];
            var oldPass = request[1];
            var newPass = request[2];

            var user = await _userManager.FindByNameAsync(username);
            if (await _userManager.CheckPasswordAsync(user, oldPass))
            {
                var res = await _userManager.ChangePasswordAsync(user, oldPass, newPass);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}