using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Entities
{
    internal class AppUserWithRole
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }    
    }
}
