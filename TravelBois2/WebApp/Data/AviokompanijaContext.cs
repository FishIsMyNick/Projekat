﻿using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Data
{
    public class AviokompanijaContext : DbContext
    {
        public AviokompanijaContext(DbContextOptions<AviokompanijaContext> options) : base(options) { }
        
        public DbSet<Aviokompanija> Aviokompanije { get; set; }
        public DbSet<Let> Letovi { get; set; }
        public DbSet<Aerodrom> Aerodromi { get; set; }
    }
}