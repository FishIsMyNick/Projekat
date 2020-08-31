using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using WebApp.Data;
using WebApp.Models;
using WebApp.Models.Misc;
using System.IO;
using Microsoft.AspNetCore.Http;
using Azure.Storage.Blobs;
using System.Text;
using System.Reflection.Metadata;
using WebApp.Helpers;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RentController : ControllerBase
	{
		private RentaContext _context;
		private UserManager<ApplicationUser> _userManager;
		private UserContext _userContext;
		public RentController(RentaContext context, UserManager<ApplicationUser> userManager, UserContext userContext)
		{
			_context = context;
			_userManager = userManager;
			_userContext = userContext;
		}

		#region GET
		// GET: api/Rent/GetAllRents
		[HttpGet]
		[Route("GetAllRents")]
		public async Task<ActionResult<IEnumerable<RentACar>>> GetAllRents()
		{
			return await _context.Rente.ToListAsync();
		}
		// GET: api/Rent/GetRent
		[HttpPost]
		[Route("GetRent")]
		public ActionResult<RentACar> GetRent()
		{
			List<RentACar> rente = _context.Rente.ToList();
			foreach (RentACar r in rente)
			{
				if (r.AdminID == HttpContext.Request.Form.Keys.First())
					return r;
			}
			return null;
		}

		[HttpGet]
		[Route("GetKola")]
		public async Task<ActionResult<Kola>> GetKola(string naziv)
		{
			return await _context.Kola.FindAsync(naziv);
		}
		[HttpGet]
		[Route("GetProsecnaOcena")]
		public float GetProsecnaOcena(string naziv)
		{
			Ocena ocena = GetOcenaKola(naziv);
			return ocena != null ? ocena.Value : -1;
		}
		#endregion

		#region POST
		// POST: api/Rent/AddRent
		[HttpPost]
		[Route("AddRent")]
		public async Task<ActionResult<RentACar>> AddRent(RentACar rent)
		{
			if (!RentExists(rent.Naziv))
			{
				_context.Rente.Add(rent);
				await _context.SaveChangesAsync();

				return CreatedAtAction("GetRent", new { naziv = rent.Naziv }, rent);
			}
			else
			{
				return new StatusCodeResult((int)HttpStatusCode.BadRequest);
			}
		}
		// POST: api/Rent/AddCompanyImage
		[HttpPost]
		[Route("AddCompanyImage")]
		public async Task<HttpResponseMessage> AddCompanyImage()
		{
			IFormFile postedFile;
			string filename;
			GetImageFromHttpContext(out postedFile, out filename);

			//Save file locally and upload to blob
			await BlobHandler.UploadCompanyImage(postedFile, filename);

			return new HttpResponseMessage(HttpStatusCode.OK);
		}
		// POST: api/Rent/AddCarImage
		[HttpPost]
		[Route("AddCarImage")]
		public async Task<HttpResponseMessage> AddCarImage()
		{
			IFormFile postedFile;
			string filename;
			GetImageFromHttpContext(out postedFile, out filename);

			await BlobHandler.UploadCarImage(postedFile, filename);
			return new HttpResponseMessage(HttpStatusCode.OK);
		}
		[HttpPost]
		[Route("GetCarsFromAdmin")]
		public async Task<ActionResult<List<Kola>>> GetCarsFromAdmin()
		{
			List<RentACar> rente = await _context.Rente.ToListAsync();
			List<Kola> kola = await _context.Kola.ToListAsync();
			string adminID = HttpContext.Request.Form.Keys.First();

			List<Kola> ret = new List<Kola>();
			foreach (RentACar rent in rente.Where(e => e.AdminID == adminID))
			{
				ret.AddRange(kola.Where(e => e.NazivRente == rent.Naziv));
			}
			return ret;
		}
		[HttpPost]
		[Route("GetCarsFromRent")]
		public async Task<ActionResult<List<Kola>>> GetCarsFromRent()
		{
			List<Kola> kola = await _context.Kola.ToListAsync();
			List<Kola> ret = new List<Kola>();
			string rentID = HttpContext.Request.Form.Keys.First();

			foreach (Kola k in kola.Where(e => e.NazivRente == rentID))
			{
				ret.Add(k);
			}
			return ret;
		}
		[HttpPost]
		[Route("GetZauzetost")]
		public async Task<ActionResult<List<Zauzetost>>> GetZauzetost(Kola kola)
		{
			var zauzetosti = await _context.Zauzetost.ToListAsync();
			List<Zauzetost> ret = new List<Zauzetost>();
			foreach (Zauzetost z in zauzetosti)
			{
				if (z.Kola == kola.Naziv && z.Renta == kola.NazivRente)
					ret.Add(z);
			}
			return ret;
		}

		[HttpPost]
		[Route("AddCar")]
		public async Task<ActionResult<Kola>> AddCar(Kola kola)
		{
			if (!CarExists(kola.Naziv, kola.NazivRente))
			{
				_context.Kola.Add(kola);
				await _context.SaveChangesAsync();

				return CreatedAtAction("GetKola", new { naziv = kola.Naziv }, kola);
			}
			else
			{
				return BadRequest();
			}
		}
		[HttpPut]
		[Route("AddOcena")]
		public async Task<ActionResult<float>> AddOcena(string naziv, short val)
		{
			OcenaRente ocena = new OcenaRente();
			ocena.kompanija = naziv;
			ocena.Value = val;
			_context.OceneRente.Add(ocena);

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (GetOcenaKola(naziv) == null)
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
		[HttpPost]
		[Route("AddReservation")]
		public async Task<ActionResult<bool>> AddReservation()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string[] odDate = request[0].Split('/');
			string[] doDate = request[1].Split('/');
			DateTime od = new DateTime(int.Parse(odDate[2]),
										int.Parse(odDate[1]) + 1,
										int.Parse(odDate[0]));
			DateTime dok = new DateTime(int.Parse(doDate[2]),
										int.Parse(doDate[1]) + 1,
										int.Parse(doDate[0]));
			if(od > dok)
			{
				DateTime temp = od;
				od = dok;
				dok = temp;
			}
			string kola = request[2];
			string rent = request[3];
			string user = request[4];
			Zauzetost z = new Zauzetost();
			z.Do = dok;
			z.Od = od;
			z.Kola = kola;
			z.Renta = rent;
			z.User = user;
			_context.Zauzetost.Add(z);
			int rez = await _context.SaveChangesAsync();
			return rez > 0;
		}
		[HttpPost]
		[Route("RentAdminExists")]
		public async Task<HttpResponseMessage> RentAdminExists()
		{
			var httpRequest = HttpContext.Request;
			string admin = httpRequest.Form.Keys.First();

			var user = await _userManager.FindByNameAsync(admin);
			if (user != null && user.TipKorisnika == "RentAdmin")
				return new HttpResponseMessage(HttpStatusCode.OK);
			else
				return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}
		#endregion

		#region Helpers
		private bool RentExists(string naziv)
		{
			return _context.Rente.Any(e => e.Naziv == naziv);
		}
		private bool CarExists(string naziv, string nazivRente)
		{
			return _context.Kola.Any(e => e.Naziv == naziv && e.NazivRente == nazivRente);
		}
		private OcenaRente GetOcenaKola(string naziv)
		{
			if (_context.OceneKola.Any(e => e.Naziv == naziv))
			{
				return (OcenaRente)_context.OceneKola.ToList().Where(e => e.Naziv == naziv);
			}
			else return null;
		}
		private void GetImageFromHttpContext(out IFormFile pic, out string filename)
		{
			var httpRequest = HttpContext.Request;

			//Get image from request
			pic = httpRequest.Form.Files[0];
			filename = httpRequest.Form.Keys.First();
		}
		#endregion
	}
}
