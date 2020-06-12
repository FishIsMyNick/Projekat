﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using WebApp.Data;
using WebApp.Models;
using WebApp.Models.Misc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RentController : ControllerBase
	{
		private readonly RentaContext _context;
		public RentController(RentaContext context)
		{
			_context = context;
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
		[HttpGet]
		[Route("GetRent")]
		public async Task<ActionResult<RentACar>> GetRent(Tuple<string,string> data)
		{
			RentACar rent = await _context.Rente.FindAsync(data.Item1);
			if (rent.AdminID == data.Item2)
				return rent;
			else
				return null;
		}
		// GET: api/Rent/GetAllKolas
		[HttpGet]
		[Route("GetAllKolas")]
		public async Task<ActionResult<IEnumerable<Kola>>> GetAllKolas()
		{
			return await _context.Kolas.ToListAsync();
		}
		[HttpGet]
		[Route("GetKola")]
		public async Task<ActionResult<Kola>> GetKola(string naziv)
		{
			return await _context.Kolas.FindAsync(naziv);
		}
		[HttpGet]
		[Route("GetProsecnaOcena")]
		public float GetProsecnaOcena(string naziv)
		{
			Ocena ocena = GetOcena(naziv);
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
				return BadRequest();
			}
		}
		[HttpPost]
		[Route("AddKola")]
		public async Task<ActionResult<Kola>> AddKola(Kola kola)
		{
			if (!KolaExists(kola.Naziv))
			{
				_context.Kolas.Add(kola);
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
			Ocena ocena = GetOcena(naziv);
			if (ocena != null)
			{
				ocena.Value = ocena.Value * ocena.BrojOcena + val;
				ocena.BrojOcena++;
				_context.Entry(ocena).State = EntityState.Modified;

				try
				{
					await _context.SaveChangesAsync();
				}
				catch (DbUpdateConcurrencyException)
				{
					if (GetOcena(naziv) == null)
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
			return BadRequest();
		}
		#endregion

		#region Helpers
		private bool RentExists(string naziv)
		{
			return _context.Rente.Any(e => e.Naziv == naziv);
		}
		private bool KolaExists(string naziv)
		{
			return _context.Kolas.Any(e => e.Naziv == naziv);
		}
		private Ocena GetOcena(string naziv)
		{
			if (_context.OceneRente.Any(e => e.kompanija == naziv))
			{
				return (OcenaRente)_context.OceneRente.ToList().Where(e => e.kompanija == naziv);
			}
			else if (_context.OceneKola.Any(e => e.naziv == naziv))
			{
				return (OcenaRente)_context.OceneKola.ToList().Where(e => e.naziv == naziv);
			}
			else return null;
		}
		#endregion
	}
}
