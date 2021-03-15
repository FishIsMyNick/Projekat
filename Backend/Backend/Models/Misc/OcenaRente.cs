using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Misc
{
	public class OcenaRente : Ocena
	{
		[Column(TypeName = "nvarchar(40)")]
		public string kompanija { get; set; }
	}
}
