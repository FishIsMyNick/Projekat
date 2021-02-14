using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.Misc;
using WebApp.Models.Rent;

namespace WebApp.Data
{
	public class RentaContext : DbContext
	{
		public RentaContext(DbContextOptions<RentaContext> options) : base(options)
		{

		}
		public DbSet<Kola> Kola { get; set; }
		public DbSet<RentACar> Rente { get; set; }
		public DbSet<Filijala> Filijale { get; set; }
		public DbSet<OcenaKola> OceneKola { get; set; }
		public DbSet<OcenaRente> OceneRente { get; set; }
		public DbSet<Zauzetost> Zauzetost { get; set; }
	}
}
