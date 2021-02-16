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
		public string filijalaID { get; set; }
		public string Naziv { get; set; }
		public int BrojMesta { get; set; }
		public int Godiste { get; set; }
		public string TipVozila { get; set; }
		public int Cena { get; set; }
		public int CenaBrzeRezervacije { get; set; }
		public int Filijala { get; set; }
		// Van tabele BP
		public int Ocena { get; set; }
		public string User { get; set; }
		public string NovaMarka { get; set; }
		public string NovModel { get; set; }
		public List<Tuple<DateTime, DateTime>> Zauzetost { get; set; }
	}
}
