using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
	public class RentACarModel
	{
		public string Naziv { get; set; }
		public string Adresa { get; set; }
		public string Grad { get; set; }
		public string Drzava { get; set; }
		public string AdminID { get; set; }
		public string Opis { get; set; }
	}
}
