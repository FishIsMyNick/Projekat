﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Pozivnica
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Ime { get; set; }
        [Required]
        public string Prezime { get; set; }
        [Required]
        public string BrojPasosa { get; set; }
        [Required]
        public bool Rezervisano { get; set; }
        [Required]
        public int IdLeta { get; set; }
        [Required]
        public string IdSedista { get; set; }
        [Required]
        public int CenaSedista { get; set; }
        [Required]
        public string PozvaoUsername { get; set; }

    }
}
