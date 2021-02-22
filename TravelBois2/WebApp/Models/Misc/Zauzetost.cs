using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Misc
{
	public class Zauzetost
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string ID { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string User { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string Kola { get; set; }
		[Column(TypeName = "smallint")]
		public int Filijala { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string Renta { get; set; }	// FOREIGN KEY
		[Column(TypeName ="date")]
		public DateTime Od { get; set; }
		[Column(TypeName = "date")]
		public DateTime Do { get; set; }
	}
}
