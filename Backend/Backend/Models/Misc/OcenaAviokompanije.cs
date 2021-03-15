using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Misc
{
	public class OcenaAviokompanije
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string ID { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string UserID { get; set; }
		[Column(TypeName = "tinyint")]
		public int Value { get; set; }
		[Column(TypeName = "nvarchar(40)")]
		public string kompanija { get; set; }


	}
}
