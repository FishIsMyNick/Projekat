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
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
            if(ListClaims.Count != 0) { 
            var prvi = ListClaims.First();

            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string userId = prvi.Value;            
                var user = await _userManager.FindByIdAsync(userId);
                if(user.TipKorisnika == "AvioAdmin")
                {
                    AvioAdmin admin = user as AvioAdmin;
                    return new
                    {
                        user.UserName,
                        user.Email,
                        user.Name,
                        user.Lastname,
                        user.Grad,
                        user.BrojTelefona,
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
                        user.BrojTelefona,
                        user.BrojPasosa,
                        user.TipKorisnika
                    };
                }
                
            }
            else
            {
                return "";
            }
        }

    }
}