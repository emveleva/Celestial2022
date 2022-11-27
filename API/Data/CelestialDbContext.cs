using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
      public class CelestialDbContext : DbContext
      {
            public CelestialDbContext(DbContextOptions options) : base(options)
            {
                this.Database.Migrate();
            }
            public DbSet<Article> Articles { get; set; }
            public DbSet<User> Users { get; set; }
      }
}