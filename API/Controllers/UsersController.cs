using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
       private readonly IUserService userService;

        public UsersController(IUserService _userService)
        {
            _userService = userService;
        }

        [HttpPost("{userId}/liked")]
        public async Task<ActionResult> AddToLiked(int articleId, int userId)
        {

            await userService.AddToLiked(articleId, userId);
            
            return Ok();
        }

        [HttpGet("{id}/liked")]

        public async Task<ActionResult<IEnumerable<Article>>> GetLikedArticles(int id)
        {
            var articles = await userService.GetLikedArticles(id);

            return Ok(articles);
        }

        [HttpDelete("{id}/liked/{articleId}")]

        public async Task<ActionResult> RemoveFromLiked(int articleId, int id)
        {
            await userService.RemoveFromLiked(articleId, id);

            return Ok();
        }

        //  [HttpGet("{username}", Name = "GetUser")]
        // public async Task<ActionResult<UserDto>> GetUser(string username)
        // {
        //     return await _unitOfWork.UserRepository.GetMemberAsync(username);
        // }

        // [HttpPut]
        // public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        // {

        //     var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

        //     _mapper.Map(memberUpdateDto, user);

        //     _unitOfWork.UserRepository.Update(user);

        //     if (await _unitOfWork.Complete()) return NoContent();

        //     return BadRequest("Failed to update user");
        // }
    }
}