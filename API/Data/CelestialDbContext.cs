using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
       public class CelestialDbContext : IdentityDbContext<AppUser, AppRole, string,
        IdentityUserClaim<string>, AppUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    
      {
            public CelestialDbContext(DbContextOptions<CelestialDbContext> options) : base(options)
            {
                this.Database.Migrate();
            }

            public DbSet<Article> Articles { get; set; }
            public DbSet<AppUser> Users { get; set; }


           
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
            base.OnModelCreating(modelBuilder);
        }
      }
}