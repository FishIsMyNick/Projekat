﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.Misc;

namespace WebApp.Data
{
	public class RentaContext : DbContext
	{
		public RentaContext(DbContextOptions<RentaContext> options) : base(options)
		{

		}
		public DbSet<Kola> Kolas { get; set; }
		public DbSet<RentACar> Rente { get; set; }
		public DbSet<OcenaKola> OceneKola { get; set; }
		public DbSet<OcenaRente> OceneRente { get; set; }
		public DbSet<Zauzetost> Zauzetosts { get; set; }
	}
}
