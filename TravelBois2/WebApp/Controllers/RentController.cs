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
using WebApp.Models.Enum;
using TipKola = WebApp.Models.Enum.Enums.TipKola;
using WebApp.Models.Rent;

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
		[HttpGet]
		[Route("GetAllCars")]
		public async Task<ActionResult<List<Kola>>> GetAllCars()
		{
			return await _context.Kola.ToListAsync();
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
		[HttpPost]
		[Route("OceniKola")]
		public async Task<ActionResult<bool>> OceniKola()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string naziv = request[0];
			string renta = request[1];
			int ocena = int.Parse(request[2]);
			string user = request[3];

			List<OcenaKola> ocene = await _context.OceneKola.ToListAsync();
			foreach (OcenaKola oc in ocene)
			{
				// Da li ocena vec postoji od istog korisnika
				if (oc.Naziv == naziv && oc.Kompanija == renta && oc.Username == user)
					return false;
			}
			OcenaKola o = new OcenaKola();
			o.Username = user;
			o.Value = ocena;
			o.Naziv = naziv;
			o.Kompanija = renta;
			_context.OceneKola.Add(o);
			await _context.SaveChangesAsync();
			return true;
		}

		[HttpPost]
		[Route("ProsecnaOcenaKola")]
		public async Task<ActionResult<float>> ProsecnaOcenaKola(Kola kola)
		{
			List<OcenaKola> ocene = await _context.OceneKola.ToListAsync();
			float sum = 0;
			int i = 0;
			foreach (OcenaKola o in ocene)
			{
				if (o.Naziv == kola.Naziv && o.Kompanija == kola.NazivRente)
				{
					sum += o.Value;
					i++;
				}
			}
			return i == 0 ? 0 : sum / i;
		}

		[HttpPost]
		[Route("ProsecnaOcenaRente")]
		public async Task<ActionResult<float>> ProsecnaOcenaRente(RentACar renta)
		{
			List<OcenaRente> ocene = await _context.OceneRente.ToListAsync();
			float sum = 0;
			int i = 0;
			foreach (OcenaRente o in ocene)
			{
				if (o.kompanija == renta.Naziv)
				{
					sum += o.Value;
					i++;
				}
			}
			return i == 0 ? 0 : sum / i;
		}

		[HttpPost]
		[Route("GetRentByName")]
		public async Task<ActionResult<RentACar>> GetRentByName()
		{
			string rentID = HttpContext.Request.Form.Keys.First();
			List<RentACar> rente = await _context.Rente.ToListAsync();
			foreach (RentACar r in rente)
			{
				if (r.Naziv == rentID)
					return r;
			}
			return null;
		}

		[HttpPost]
		[Route("OceniRentu")]
		public async Task<ActionResult<bool>> OceniRentu()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string naziv = request[0];
			int ocena = int.Parse(request[1]);
			string user = request[2];

			List<OcenaRente> ocene = await _context.OceneRente.ToListAsync();
			foreach (OcenaRente oc in ocene)
			{
				// renta vec ocenjena
				if (oc.Username == user && oc.kompanija == naziv)
					return false;
			}
			OcenaRente o = new OcenaRente();
			o.kompanija = naziv;
			o.Username = user;
			o.Value = ocena;

			_context.OceneRente.Add(o);
			await _context.SaveChangesAsync();
			return true;
		}

		// Post: api/Rent/GetRent
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

		[HttpPost]
		[Route("GetFilijale")]
		public ActionResult<List<Filijala>> GetFilijale()
        {
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			var admin = request[0];

			List<Filijala> filijale = _context.Filijale.ToList().Where(e => e.AdminID == admin).ToList();

			return filijale;
        }

		[HttpPost]
		[Route("DodajFilijalu")]
		public async Task<ActionResult<List<Filijala>>> DodajFilijalu(Filijala filijala)
        {
			_context.Filijale.Add(filijala);
			await _context.SaveChangesAsync();

			return await _context.Filijale.ToListAsync();
        }

		[HttpPost]
		[Route("GetFilijalaById")]
		public async Task<ActionResult<Filijala>> GetFilijalaById()
        {
			var request = Int32.Parse(HttpContext.Request.Form.Keys.First());
			return await _context.Filijale.FindAsync(request);
        }

		[HttpPost]
		[Route("IzmeniFilijalu")]
		public async Task<ActionResult<List<Filijala>>> IzmeniFilijalu(Filijala f)
        {
			_context.Filijale.Update(f);
			await _context.SaveChangesAsync();
			return await _context.Filijale.ToListAsync();
        }
		[HttpPost]
		[Route("ObrisiFilijalu")]
		public async Task<ActionResult<List<Filijala>>> IzmeniFilijalu()
        {
			int id = Int32.Parse(HttpContext.Request.Form.Keys.First());
			foreach(Kola k in _context.Kola.ToList())
            {
				if (k.Filijala == id)
					return null;
            }
			_context.Filijale.Remove(_context.Filijale.Find(id));
			await _context.SaveChangesAsync();
			return await _context.Filijale.ToListAsync();
        }


		[HttpPost]
		[Route("GetKola")]
		public async Task<ActionResult<Kola>> GetKola()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string naziv = request[0];
			string renta = request[1];
			var kola = await _context.Kola.ToListAsync();
			foreach (Kola k in kola)
			{
				if (k.Naziv == naziv && k.NazivRente == renta)
					return k;
			}
			return null;
		}

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
		[HttpPost]
		[Route("UpdateRent")]
		public async Task<ActionResult<RentACar>> UpdateRent(RentACar renta)
		{
			RentACar r = await _context.Rente.FindAsync(renta.Naziv);
			r.Grad = renta.Grad;
			r.Drzava = renta.Drzava;
			r.Adresa = renta.Adresa;
			r.Opis = renta.Opis;
			_context.Rente.Update(r);
			await _context.SaveChangesAsync();
			return r;
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
		[Route("UpdateCarImage")]
		public async Task<HttpResponseMessage> UpdateCarImage()
		{
			IFormFile postedFile;
			string filename;
			GetImageFromHttpContext(out postedFile, out filename);
			string oldname = postedFile.FileName;
			await BlobHandler.DeleteCarImage(oldname);
			await BlobHandler.UploadCarImage(postedFile, filename);
			await FileHandler.Refresh();
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
		[Route("GetKolaFilijale")]
		public async Task<ActionResult<List<Kola>>> GetKolaFilijale()
        {
			var request = HttpContext.Request.Form.Keys.ToList();
			string renta = request[0];
			int filijala = Int32.Parse(request[1]);

			var svaKola = await _context.Kola.ToListAsync();
			var kolaRente = svaKola.Where(e => e.NazivRente == renta).ToList();
			if (filijala == -1)
				return kolaRente;
			else 
				return kolaRente.Where(e => e.Filijala == filijala).ToList();
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
		[Route("GetReservations")]
		public async Task<ActionResult<List<Zauzetost>>> GetReservations()
		{
			var request = HttpContext.Request.Form.Keys;
			string userID = request.First();

			var reservations = await _context.Zauzetost.ToListAsync();
			List<Zauzetost> ret = new List<Zauzetost>();
			foreach (Zauzetost z in reservations)
			{
				if (z.User == userID)
				{
					ret.Add(z);
				}
			}
			return ret;
		}

		[HttpPost]
		[Route("DeleteReservation")]
		public async Task<ActionResult<Zauzetost>> DeleteReservation()
		{
			string id = HttpContext.Request.Form.Keys.First();
			var z = await _context.Zauzetost.FindAsync(id);
			_context.Remove(z);
			await _context.SaveChangesAsync();
			return z;
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

		[HttpPost]
		[Route("UpdateCarPrice")]
		public async Task<Kola> UpdateCarPrice()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string kola = request[0];
			string renta = request[1];
			int novaCena = int.Parse(request[2]);
			int novaCenaBR = int.Parse(request[3]);

			Kola car = await _context.Kola.FindAsync(kola);
			car.Cena = novaCena;
			car.CenaBrzeRezervacije = novaCenaBR;
			_context.Kola.Update(car);
			await _context.SaveChangesAsync();
			return car;
		}

		[HttpPost]
		[Route("UpdateCar")]
		public async Task<ActionResult<Kola>> UpdateCar()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();
			string naziv = request[0];
			string renta = request[1];

			Kola kola = new Kola();
			foreach (Kola k in await _context.Kola.ToListAsync())
			{
				if (k.Naziv == naziv && k.NazivRente == renta)
				{
					kola = k;
					break;
				}
			}

			kola.BrojMesta = int.Parse(request[2]);
			kola.Godiste = int.Parse(request[3]);
			kola.Cena = int.Parse(request[4]);
			kola.CenaBrzeRezervacije = int.Parse(request[5]);
			kola.Filijala = int.Parse(request[6]);
			kola.TipVozila = request[7];

			var ret = _context.Kola.Update(kola);
			await _context.SaveChangesAsync();
			return kola;
		}

		[HttpPost]
		[Route("ReplaceCar")]
		public async Task<ActionResult<Kola>> ReplaceCar()
		{
			var request = HttpContext.Request.Form.Keys.ToList<string>();

			// Izmena kola
			string naziv = request[0];
			string renta = request[8];

			Kola kola = new Kola();
			foreach (Kola k in await _context.Kola.ToListAsync())
			{
				if (k.Naziv == naziv && k.NazivRente == renta)
				{
					kola = k;
					break;
				}
			}

			var remK = _context.Kola.Remove(kola);
			await _context.SaveChangesAsync();
			kola.BrojMesta = int.Parse(request[1]);
			kola.Godiste = int.Parse(request[2]);
			kola.Cena = int.Parse(request[3]);
			kola.Filijala = int.Parse(request[4]);
			kola.TipVozila = request[5];
			kola.Naziv = request[6] + "-" + request[7];
			_context.Kola.Add(kola);

			// Izmena slike

			//BlobHandler.UploadCarImage()

			// Izmena ocena

			var ocene = await _context.OceneKola.ToListAsync();
			foreach (OcenaKola o in ocene)
			{
				if (o.Kompanija == kola.NazivRente && o.Naziv == naziv)
				{
					o.Naziv = kola.Naziv;
					_context.OceneKola.Update(o);
				}

			}

			// Izmena rezervacija

			var rezervacije = await _context.Zauzetost.ToListAsync();
			foreach (Zauzetost z in rezervacije)
			{
				if (z.Kola == naziv && z.Renta == kola.NazivRente)
				{
					z.Kola = kola.Naziv;
					_context.Zauzetost.Update(z);
				}
			}

			await _context.SaveChangesAsync();

			return kola;
		}
		/// <summary>
		/// Brise kola, ocene kola i sliku kola u blob storage-u
		/// </summary>
		/// <param name="kola"></param>
		/// <returns>
		/// 0  => Uspesno obrisano
		/// -1 => Kola su zauzeta, ne mogu se obrisati
		/// -2 => Greska u brisanju slike, kola se ne brisu
		/// -3 => Greska u brisanju kola ili ocena, kola se ne brisu
		/// </returns>
		[HttpPost]
		[Route("DeleteCar")]
		public async Task<int> DeleteCar(Kola kola)
		{
			var rezervacije = await _context.Zauzetost.ToListAsync();
			// Da li su kola zauzeta? Ne mogu se obrisati
			foreach (Zauzetost z in rezervacije)
			{
				if (z.Kola == kola.Naziv && z.Renta == kola.NazivRente)
				{
					if(z.Do > DateTime.Now)
						return -1;
				}
			}
			// else
			
			try
			{
				await BlobHandler.DeleteCarImage(kola.Naziv);	//Obrisi sliku kola
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
				return -2;
			}

			try
			{
				_context.Kola.Remove(kola);

				// Brisanje ocena
				var ocene = await _context.OceneKola.ToListAsync();
				foreach (OcenaKola o in ocene)
				{
					if (o.Naziv == kola.Naziv && o.Kompanija == kola.NazivRente)
					{
						_context.OceneKola.Remove(o);
					}
				}
			}
			catch(Exception e)
            {
				Console.WriteLine(e.Message);
				return -3;
            }

			await _context.SaveChangesAsync();
			return 0;
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
			if (od > dok)
			{
				DateTime temp = od;
				od = dok;
				dok = temp;
			}
			string kola = request[2];
			int filijala = Int32.Parse(request[3]);
			string rent = request[4];
			string user = request[5];
			bool br = request[6] == "true" ? true : false;
			Zauzetost z = new Zauzetost();
			z.Do = dok;
			z.Od = od;
			z.Kola = kola;
			z.Filijala = filijala;
			z.Renta = rent;
			z.User = user;
			z.BrzaRezervacija = br;
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

		[HttpGet]
		[Route("Refresh")]
		public async void Refresh()
		{
			await FileHandler.Refresh();
		}
		#endregion
	}
}
