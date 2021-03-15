using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Misc
{
	public class OcenaLeta
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string ID { get; set; }
		[Required]
		public string UserID { get; set; }
		[Required]
		public int Value { get; set; }
		[Required]
		public int IdLeta { get; set; }
	}
}
