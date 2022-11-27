using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly CelestialDbContext _context;
        public AuthController(CelestialDbContext context)
        {
            _context = context;
        }

        
    }
}