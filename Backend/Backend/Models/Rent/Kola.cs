using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Enum;

namespace Backend.Models
{
	public class Kola
	{
		[Key]
		[Column(TypeName = "nvarchar(40)")]
		public string Naziv { get; set; }
		[ForeignKey("renta")]
		[Column(TypeName = "nvarchar(40)")]
		public string NazivRente { get; set; }
		[ForeignKey("filijala")]
		[Column(TypeName = "smallint")]
		public int Filijala { get; set; }
		[Column(TypeName = "tinyint")]
		public int BrojMesta { get; set; }
		[Column(TypeName = "smallint")]
		public int Godiste { get; set; }
		[Column(TypeName = "nvarchar(15)")]
		public string TipVozila { get; set; }
		[Column(TypeName = "smallint")]
		public int Cena { get; set; }
		[Column(TypeName = "smallint")]
		public int CenaBrzeRezervacije { get; set; }
	}
}
