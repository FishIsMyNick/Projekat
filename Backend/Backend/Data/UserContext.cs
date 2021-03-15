using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Data
{
	public class UserContext : DbContext
	{
		public UserContext(DbContextOptions<UserContext> options) : base(options)
		{ }
		public DbSet<ApplicationUser> AppUsers { get; set; }
		public DbSet<PrijateljZahtev> Zahtevi { get; set; }
		public DbSet<PrihvacenPrijatelj> Prijatelji { get; set; }
	}
}
