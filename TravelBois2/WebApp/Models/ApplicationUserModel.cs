﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class ApplicationUserModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
		public string Grad { get; set; }
		public string BrojPasosa { get; set; }
		public string BrojTelefona { get; set; }
        public string TipKorisnika { get; set; }
	}
}
