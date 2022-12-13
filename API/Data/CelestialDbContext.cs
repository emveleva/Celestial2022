using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
       public class CelestialDbContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
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
             modelBuilder.Entity<AppUser>(b =>
        {
            // Each User can have many entries in the UserRole join table
            b.HasMany(e => e.UserRoles)
                .WithOne(e => e.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
        });

        modelBuilder.Entity<AppRole>(b =>
        {
            // Each Role can have many entries in the UserRole join table
            b.HasMany(e => e.UserRoles)
                .WithOne(e => e.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        });

        modelBuilder.Entity<LikedArticle>()
                .HasKey(a => new { a.AppUserId, a.ArticleId });

            modelBuilder.Entity<LikedArticle>()
                .HasOne(s => s.AppUser)
                .WithMany(l => l.LikedArticles)
                .HasForeignKey(s => s.ArticleId)
                .OnDelete(DeleteBehavior.Restrict);
            base.OnModelCreating(modelBuilder);
        }
      }
}