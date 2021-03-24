using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;
using Backend.Models.Misc;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AviokompanijaController : ControllerBase
    {
        private readonly AviokompanijaContext _context;

        public AviokompanijaController(AviokompanijaContext context)
        {
            _context = context;
        }

        [HttpPut("{naziv}")]
        [Route("UpdateAviokompanijaProfil/{naziv}")]
        public async Task<IActionResult> UpdateAviokompanijaProfil(string naziv, Aviokompanija aviokompanija)
        {
            if (naziv != aviokompanija.Naziv)
            {
                return BadRequest();
            }

            _context.Entry(aviokompanija).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AviokompanijaExists(naziv))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost]
        [Route("AddAvioKompanija")]
        public async Task<ActionResult<Aviokompanija>> AddAvioKompanija()
        {
            var request = HttpContext.Request.Form.Keys.ToList();
            var naziv = request[0];
            var adresa = request[1];
            var grad = request[2];
            var drzava = request[3];
            var opis = request[4];

            if (!AviokompanijaExists(naziv))
            {
                Aviokompanija aviokompanija = new Aviokompanija()
                {
                    Naziv = naziv,
                    Adresa = adresa,
                    Grad = grad,
                    Drzava = drzava,
                    Opis = opis
                };
                _context.Aviokompanije.Add(aviokompanija);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAvioKompanija", new { naziv = aviokompanija.Naziv }, aviokompanija);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetAvioKompanije")]
        public async Task<ActionResult<IEnumerable<Aviokompanija>>> GetAvioKompanije()
        {
            return await _context.Aviokompanije.ToListAsync();

        }

        [HttpGet]
        [Route("GetPresedanja")]
        public async Task<ActionResult<IEnumerable<Presedanje>>> GetPresedanja()
        {
            return await _context.Presedanja.ToListAsync();

        }


        [HttpPost]
        [Route("AddAerodrom")]
        public async Task<ActionResult<Aerodrom>> AddAerodrom(Aerodrom aerodrom)
        {
            _context.Aerodromi.Add(aerodrom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAerodrom", new { id = aerodrom.Id }, aerodrom);
        }

        [HttpPost]
        [Route("AddLet")]
        public async Task<ActionResult<Let>> AddLet(Let let)
        {
            _context.Letovi.Add(let);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetLet", new { id = let.Id }, let);

        }

        [HttpPost]
        [Route("AddSediste")]
        public async Task<ActionResult<Sediste>> AddSediste(Sediste sediste)
        {
            _context.SedistaLeta.Add(sediste);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSediste", new { id = sediste.Id }, sediste);

        }

        [HttpPost]
        [Route("AddBrzaRezervacija")]
        public async Task<ActionResult<BrzaRezervacija>> AddBrzaRezervacija(BrzaRezervacija brzaRezervacija)
        {
            _context.BrzeRezervacije.Add(brzaRezervacija);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBrzaRezervacija", new { id = brzaRezervacija.Id }, brzaRezervacija);

        }

        [HttpPost]
        [Route("AddPozivnica")]
        public async Task<ActionResult<Pozivnica>> AddPozivnica(Pozivnica pozivnica)
        {
            _context.Pozivnice.Add(pozivnica);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPozivnica", new { id = pozivnica.Id }, pozivnica);

        }

        [HttpPost]
        [Route("AddOcenaAviokompanije")]
        public async Task<ActionResult<OcenaAviokompanije>> AddOcenaAviokompanije(OcenaAviokompanije ocena)
        {
            _context.OceneAviokompanije.Add(ocena);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOcena", new { id = ocena.ID }, ocena);
        }

        [HttpPost]
        [Route("AddOcenaLeta")]
        public async Task<ActionResult<OcenaLeta>> AddOcenaLeta(OcenaLeta ocena)
        {
            _context.OceneLeta.Add(ocena);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOcenaLeta", new { id = ocena.ID }, ocena);
        }

        [HttpGet]
        [Route("GetOceneAvio")]
        public async Task<ActionResult<IEnumerable<OcenaAviokompanije>>> GetOceneAvio()
        {
            return await _context.OceneAviokompanije.ToListAsync();
        }

        [HttpGet]
        [Route("GetOceneLeta")]
        public async Task<ActionResult<IEnumerable<OcenaLeta>>> GetOceneLeta()
        {
            return await _context.OceneLeta.ToListAsync();
        }

        [HttpGet]
        [Route("GetLetovi")]
        public async Task<ActionResult<IEnumerable<Let>>> GetLetovi()
        {
            return await _context.Letovi.ToListAsync();
        }

        [HttpGet]
        [Route("GetSedista")]
        public async Task<ActionResult<IEnumerable<Sediste>>> GetSedista()
        {
            return await _context.SedistaLeta.ToListAsync();
        }

        [HttpGet]
        [Route("GetBrzeRezervacije")]
        public async Task<ActionResult<IEnumerable<BrzaRezervacija>>> GetBrzeRezervacije()
        {
            return await _context.BrzeRezervacije.ToListAsync();
        }

        [HttpGet]
        [Route("GetPozivnice")]
        public async Task<ActionResult<IEnumerable<Pozivnica>>> GetPozivnice()
        {
            return await _context.Pozivnice.ToListAsync();
        }

        [HttpGet]
        [Route("GetAerodromi")]
        public async Task<ActionResult<IEnumerable<Aerodrom>>> GetAerodromi()
        {
            return await _context.Aerodromi.ToListAsync();
        }

        [HttpDelete]
        [Route("DeleteAerodrom/{grad}")]
        public async Task<ActionResult<Aerodrom>> DeleteAerodrom(string grad)
        {
            var aerodrom = await _context.Aerodromi.FindAsync(grad);
            if (aerodrom == null)
            {
                return NotFound();
            }

            _context.Aerodromi.Remove(aerodrom);
            await _context.SaveChangesAsync();
            return aerodrom;
        }

        [HttpDelete]
        [Route("DeletePozivnica/{id}")]
        public async Task<ActionResult<Pozivnica>> DeletePozivnica(int id)
        {
            var pozivnica = await _context.Pozivnice.FindAsync(id);
            if (pozivnica == null)
            {
                return NotFound();
            }

            _context.Pozivnice.Remove(pozivnica);
            await _context.SaveChangesAsync();
            return pozivnica;
        }

        [HttpDelete]
        [Route("DeleteBrzaRezervacija/{id}")]
        public async Task<ActionResult<BrzaRezervacija>> DeleteBrzaRezervacija(int id)
        {
            var brzaRezervacija = await _context.BrzeRezervacije.FindAsync(id);
            if (brzaRezervacija == null)
            {
                return NotFound();
            }

            _context.BrzeRezervacije.Remove(brzaRezervacija);
            await _context.SaveChangesAsync();
            return brzaRezervacija;
        }

        [HttpDelete]
        [Route("DeleteSediste/{idLeta}/{idSedista}")]
        public async Task<ActionResult<Sediste>> DeleteSediste(int idLeta, string idSedista)
        {
            Sediste sediste = new Sediste();
            string idS = idSedista.Replace("-", " ");
            List<Sediste> sedista = _context.SedistaLeta.ToList();
            foreach (Sediste s in sedista)
            {
                if (s.IdSedista == idS && s.IdLeta == idLeta)
                {
                    sediste = s;
                }
            }

            if (sediste == null)
            {
                return NotFound();
            }

            _context.SedistaLeta.Remove(sediste);
            await _context.SaveChangesAsync();
            return sediste;
        }


        [HttpDelete]
        [Route("DeleteLet/{id}")]
        public async Task<ActionResult<Let>> DeleteLet(int id)
        {
            var let = await _context.Letovi.FindAsync(id);
            if (let == null)
            {
                return NotFound();
            }

            _context.Letovi.Remove(let);
            await _context.SaveChangesAsync();
            return let;
        }


        private bool AviokompanijaExists(string naziv)
        {
            return _context.Aviokompanije.Any(e => e.Naziv == naziv);
        }

        private bool LetExists(int id)
        {
            return _context.Letovi.Any(e => e.Id == id);
        }






    }
}