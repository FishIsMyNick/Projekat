using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Misc
{
	public abstract class Ocena : DbContext
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string ID { get; set; }
		[Column(TypeName = "smallint")]
		public int Value { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string Username { get; set; }
	}
}
