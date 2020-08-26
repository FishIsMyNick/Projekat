using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Misc
{
	public class OcenaKola : Ocena
	{
		[Column(TypeName = "nvarchar(40)")]
		public string Naziv { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string Kompanija { get; set; }
	}
}
