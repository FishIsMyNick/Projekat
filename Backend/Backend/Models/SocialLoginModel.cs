using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class SocialLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string IdToken { get; set; }
        public string Id { get; set; }
    }
}
