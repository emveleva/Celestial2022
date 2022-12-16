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

        [HttpPost("liked")]
        public async Task<ActionResult> AddToLiked(LikedArticle likedArticle)
        {

            await _unitOfWork.UserRepository.AddToLiked(likedArticle);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to add to liked.");
        }

        [HttpGet("liked/{id}")]

        public async Task<ActionResult<IEnumerable<Article>>> GetLikedArticles(int id)
        {
            var articles = await _unitOfWork.UserRepository.GetLikedArticles(id);

            return Ok(articles);
        }

        [HttpDelete("liked/{id}")]

        public async Task<ActionResult> RemoveFromLiked(int articleId, int id)
        {
            await _unitOfWork.UserRepository.RemoveFromLiked(articleId, id);

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

            var result = await _unitOfWork.UserRepository.UpdateUserProfile(user);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("All good");
        }
    }
}