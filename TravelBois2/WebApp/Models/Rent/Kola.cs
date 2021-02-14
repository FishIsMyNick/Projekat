﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Enum;

namespace WebApp.Models
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
		[Column(TypeName = "nvarchar(40)")]
		public string filijalaID { get; set; }

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
		[Column(TypeName = "bit"), DefaultValue(null)]
		public bool BrzaRezervacija { get; set; }
		[Column(TypeName = "date")]
		public DateTime BrzaRezervacijaOd { get; set; }
		[Column(TypeName = "date")]
		public DateTime BrzaRezervacijaDo { get; set; }
	}
}
