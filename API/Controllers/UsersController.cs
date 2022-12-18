using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{userId}/liked/{articleId}")]
        public async Task<ActionResult> AddToLiked(int userId, int articleId)
        {
            await _unitOfWork.UserRepository.AddToLiked(userId, articleId);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to add to liked.");
        }

        [HttpGet("liked/{id}")]

        public async Task<ActionResult<IEnumerable<Article>>> GetLikedArticles(int id)
        {
            var articles = await _unitOfWork.UserRepository.GetLikedArticles(id);

            if (articles != null) return Ok(articles);
            return Ok(new List<Article>());
        }

        [HttpDelete("{userId}/liked/{articleId}")]

        public async Task<ActionResult> RemoveFromLiked(int articleId, int userId)
        {
            await _unitOfWork.UserRepository.RemoveFromLiked(articleId, userId);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to remove from liked.");
        }

        [HttpGet("profile/{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {

            var user = await _unitOfWork.UserRepository.GetUserProfile(id);

            return Ok(user);
        }

        [HttpPut("profile")]
        public async Task<ActionResult> UpdateUserProfile(AppUser user)
        {

            _unitOfWork.UserRepository.UpdateUserProfile(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update article");
        }
    }
}