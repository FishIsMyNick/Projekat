﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
	public class RentACarModel
	{
		public string Naziv { get; set; }
		public string AdminID { get; set; }
		public float ProsecnaOcena { get; set; }
		public int BrojOcena { get; set; }
	}
}
