using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; init; }
        
        public string LastName { get; init; }

        public string ImageUrl { get; set; }

        public DateTime Created { get; set; }

        public List<Article> Articles { get; set; }
    }
}