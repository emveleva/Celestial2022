using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
       public class CelestialDbContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, IdentityUserRole<int>, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    
      {
            public CelestialDbContext(DbContextOptions<CelestialDbContext> options) : base(options)
            {
                this.Database.Migrate();
            }

            public DbSet<Article> Articles { get; set; }

            public DbSet<LikedArticle> LikedArticles { get; set;}
           
             protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

         modelBuilder.Entity<LikedArticle>()
                .HasKey(a => new { a.UserId, a.ArticleId });

                        modelBuilder.Entity<LikedArticle>()
                .HasOne(s => s.AppUser)
                .WithMany(l => l.LikedArticles)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
      }
}