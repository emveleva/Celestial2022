using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly CelestialDbContext _context;

        private readonly UserManager<AppUser> _userManager;

        public UnitOfWork(CelestialDbContext context)
        {
            _context = context;
         
        }

        public IUserRepository UserRepository => new UserRepository(_context);
        public IEditorRepository EditorRepository => new EditorRepository(_context);
        public IArticleRepository ArticleRepository => new ArticleRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            _context.ChangeTracker.DetectChanges();
            var changes = _context.ChangeTracker.HasChanges();

            return changes;
        }
    }
}