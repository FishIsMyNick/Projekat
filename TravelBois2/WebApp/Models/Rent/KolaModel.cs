using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Enum;
using WebApp.Models.Misc;

namespace WebApp.Models
{
	public class KolaModel
	{
		public string rentaID { get; set; }
		public string Naziv { get; set; }
		public int BrojMesta { get; set; }
		public int Godiste { get; set; }
		public Enums.TipKola TipVozila { get; set; }
		// Van tabele BP
		public List<OcenaKola> Ocene { get; set; }
		public List<Tuple<DateTime, DateTime>> Zauzetost { get; set; }
	}
}
