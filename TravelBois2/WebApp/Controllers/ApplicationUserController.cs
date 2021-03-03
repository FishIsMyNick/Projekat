using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Models;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly UserContext _context;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings, UserContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [HttpPost]
        [Route("RegisterUser")]
        //POST: /api/ApplicationUser/Register
        public async Task<Object> RegisterUser(ApplicationUserModel body)
        {
            Console.WriteLine("post pozvan");
            var applicationUser = new ApplicationUser()
            {
                UserName = body.UserName,
                Email = body.Email,
                Name = body.Name,
                Lastname = body.Lastname,
                Grad = body.Grad,
                Drzava = body.Drzava,
                BrojPasosa = body.BrojPasosa.ToString(),
                BrojTelefona = body.BrojTelefona.ToString(),
                TipKorisnika = body.TipKorisnika
               
            };
            try
            {
                var result = await _userManager.CreateAsync(applicationUser, body.Password);
                if(result.Errors.Any())
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
                user.PromenioPassword = true;
                await _userManager.UpdateAsync(user);
                return true;
            }
            else
            {
                return false;
            }
        }
        [HttpPost]
        [Route("RegisterAvioAdmin")]
        //POST: /api/AvioAdmin/Register
        public async Task<Object> PostAvioAdmin(AvioAdminModel body)
        {
            Console.WriteLine("post pozvan");
            var avioAdmin = new AvioAdmin()
            {
                UserName = body.UserName,
                Email = body.Email,
                Name = body.Name,
                Lastname = body.Lastname,
                Grad = body.Grad,
                NazivAviokompanije = body.NazivAviokompanije,
                BrojPasosa = body.BrojPasosa.ToString(),
                BrojTelefona = body.BrojTelefona.ToString(),
                PromenioPassword = false,
                TipKorisnika = body.TipKorisnika
            };
            try
            {
                var result = await _userManager.CreateAsync(avioAdmin, body.Password);
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
        [HttpPost]
        [Route("RegisterRentAdmin")]
        //POST: /api/AvioAdmin/Register
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
                Drzava = body.Drzava,
                BrojPasosa = body.BrojPasosa.ToString(),
                BrojTelefona = body.BrojTelefona.ToString(),
                PromenioPassword = false,
                TipKorisnika = body.TipKorisnika
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

        [HttpPost]
        [Route("RegisterAdmin")]
        //POST: /api/AvioAdmin/Register
        public async Task<Object> PostAdmin(AdminModel body)
        {
            Console.WriteLine("post pozvan");
            var admin = new Admin()
            {
                UserName = body.UserName,
                Email = body.Email,
                Name = body.Name,
                Lastname = body.Lastname,
                Grad = body.Grad,
                Drzava = body.Drzava,
                BrojPasosa = body.BrojPasosa.ToString(),
                BrojTelefona = body.BrojTelefona.ToString(),
                PromenioPassword = false,
                TipKorisnika = body.TipKorisnika
            };
            try
            {
                var svi = await _userManager.Users.ToListAsync();
                foreach(var u in svi)
                {
                    if (u.Email == admin.Email)
                    {
                        IdentityError err = new IdentityError();
                        err.Code = "DuplicateEmail";
                        IdentityResult res = new IdentityResult();
                        res.Errors.Append(err);
                        return Ok(res);
                    }
                }
                var result = await _userManager.CreateAsync(admin, body.Password);
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

        [HttpPost]
        [Route("Login")]
        //POST: /api/ApplicationUser/Login
        public async Task<IActionResult> Login([FromBody]LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);  // ovo radi kako treba
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token, user });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }


        [HttpPost]
        [Route("UpdateUser")]
        public async Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUserModel body)
        {
            if (!UserExists(body.UserName))
            {
                return null;
            }

            var user = await _userManager.FindByNameAsync(body.UserName);
            user.BrojPasosa = body.BrojPasosa;
            user.BrojTelefona = body.BrojTelefona;
            user.Grad = body.Grad;
            user.Drzava = body.Drzava;
            user.Name = body.Name;
            user.Lastname = body.Lastname;

            await _userManager.UpdateAsync(user);

            return user;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        [HttpPost]
        [Route("AddZahtev")]
        public async Task<ActionResult<PrijateljZahtev>> AddZahtev(PrijateljZahtev prijatelj) 
        {

            _context.Zahtevi.Add(prijatelj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZahtev", new { id = prijatelj.Id }, prijatelj);
        }

        [HttpGet]
        [Route("GetZahtevi")]
        public async Task<ActionResult<IEnumerable<PrijateljZahtev>>> GetZahtevi()
        {
            return await _context.Zahtevi.ToListAsync();
        }

        [HttpDelete]
        [Route("DeleteZahtev/{id}")]
        public async Task<ActionResult<PrijateljZahtev>> DeleteZahtev(int id)
        {
            var zahtev = await _context.Zahtevi.FindAsync(id);
            if (zahtev == null)
            {
                return NotFound();
            }

            _context.Zahtevi.Remove(zahtev);
            await _context.SaveChangesAsync();
            return zahtev;
        }

        [HttpPost]
        [Route("AddPrijatelj")]
        public async Task<ActionResult<PrihvacenPrijatelj>> AddPrijatelj(PrihvacenPrijatelj prijatelj)
        {

            _context.Prijatelji.Add(prijatelj);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrijatelj", new { id = prijatelj.Id }, prijatelj);
        }

        [HttpGet]
        [Route("GetPrijatelji")]
        public async Task<ActionResult<IEnumerable<PrihvacenPrijatelj>>> GetPrijatelji()
        {
            return await _context.Prijatelji.ToListAsync();
        }

        [HttpDelete]
        [Route("DeletePrijatelj/{id}")]
        public async Task<ActionResult<PrihvacenPrijatelj>> DeletePrijatelj(int id)
        {
            var prijatelj = await _context.Prijatelji.FindAsync(id);
            if (prijatelj == null)
            {
                return NotFound();
            }

            _context.Prijatelji.Remove(prijatelj);
            await _context.SaveChangesAsync();
            return prijatelj;
        }


        private bool UserExists(string username)
        {
            return _userManager.Users.Any(e => e.UserName == username);
        }
    }
}