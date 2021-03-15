using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StartController : ControllerBase
    {
        // GET: api/<StartController>
        [HttpGet]
        public string Get()
        {
            return "Server is up";
        }

        // GET api/<StartController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<StartController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StartController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StartController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
