﻿using System;
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
		[Column(TypeName = "nvarchar(40)")]
		public string AdminID { get; set; }
		[Column(TypeName = "decimal(1,1)")]
		public float ProsecnaOcena { get; set; }
		[Column(TypeName = "int")]
		public int BrojOcena { get; set; }

	}
}
