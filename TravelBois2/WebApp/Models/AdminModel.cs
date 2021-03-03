using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
	public class AdminModel
	{
		public string Email { get; set; }
		public string UserName { get; set; }
		public string Name { get; set; }
		public string Lastname { get; set; }
		public string Grad { get; set; }
		public string Drzava { get; set; }
		public string BrojTelefona { get; set; }
		public string BrojPasosa { get; set; }
		public string Password { get; set; }
		public bool PromenioPassword { get; set; }
		public string TipKorisnika { get; set; }
	}
}
