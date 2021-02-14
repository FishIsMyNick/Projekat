using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
	public class RentACar
	{
		[Key]
		[Column(TypeName = "nvarchar(40)")]
		public string Naziv { get; set; }
		[Column(TypeName = "nvarchar(50)")]
		public string Adresa { get; set; }
		[Column(TypeName = "nvarchar(30)")]
		public string Grad { get; set; }
		[Column(TypeName = "nvarchar(50)")]
		public string Drzava { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string AdminID { get; set; }
		[Column(TypeName = "nvarchar(200)")]
		public string Opis { get; set; }

	}
}
