using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Rent
{
    public class Filijala
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(TypeName = "int")]
        public int Id { get; set; }
        [Column(TypeName ="nvarchar(30)")]
        public string NazivRente { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Adresa { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Grad { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Drzava { get; set; }
    }
}
