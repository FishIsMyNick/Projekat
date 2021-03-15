using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.Enum;

namespace Backend.Models
{
    public class Let
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string DatumPolaska { get; set; }
        [Required]
        public string DatumDolaska { get; set; }
        [Required]
        public string VremePoletanja { get; set; }
        [Required]
        public string VremeSletanja { get; set; }
        [Required]
        public string MestoPolaska { get; set; }
        [Required]
        public string MestoDolaska { get; set; }
        public ICollection<Presedanje> PresedanjaLeta { get; set; }
        [Required]
        public int RazdaljinaPutovanja { get; set; }
        [Required]
        public int TrajanjePutovanja { get; set; }
        [Required]
        public KlasaLeta KlasaLeta { get; set; }
        [Required]
        public TipLeta TipLeta { get; set; }
        [Required]
        public int CenaKarte { get; set; }
        [Required]
        public string Aviokompanija { get; set; }
    }
}
