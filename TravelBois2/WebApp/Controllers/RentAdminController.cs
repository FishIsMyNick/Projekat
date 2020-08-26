using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentAdminController : ControllerBase
    {
        private UserManager<RentAdmin> _userManager;
        private SignInManager<RentAdmin> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly UserContext _context;

        public RentAdminController(UserManager<RentAdmin> userManager, SignInManager<RentAdmin> signInManager, IOptions<ApplicationSettings> appSettings, UserContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
        }
        [HttpPost]
        [Route("Register")]
        //POST: /api/ApplicationUser/Register
        public async Task<Object> PostRentAdmin(RentAdminModel body)
        {
            Console.WriteLine("post pozvan");
            var rentAdmin = new RentAdmin()
            {
                UserName = body.UserName,
                Email = body.Email,
                Name = body.Name,
                Lastname = body.Lastname,
                Grad = body.Grad,
                BrojPasosa = body.BrojPasosa.ToString(),
                PhoneNumber = body.BrojTelefona.ToString(),
                TipKorisnika = body.TipKorisnika,
                PromenioPassword = false
            };
            try
            {
                var result = await _userManager.CreateAsync(rentAdmin, body.Password);
                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    //return BadRequest(new { message = test[0].Description});
                    return Ok(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}