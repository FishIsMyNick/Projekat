
﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Misc
{
	public abstract class Ocena : DbContext
	{
		[Column(TypeName = "nvarchar(40)")]
		public string ID { get; set; }
		[Column(TypeName = "decimal(1,1)")]
		public float Value { get; set; }
		[Column(TypeName = "int")]
		public int BrojOcena { get; set; }
	}
}
