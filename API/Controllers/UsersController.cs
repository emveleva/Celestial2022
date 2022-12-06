using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        // private readonly IUnitOfWork _unitOfWork;
        public UsersController(IMapper mapper)
        {
            // _unitOfWork = unitOfWork;
            // _photoService = photoService;
            _mapper = mapper;
        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        // {
        //     var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
        //     userParams.CurrentUsername = User.GetUsername();

        //     if (string.IsNullOrEmpty(userParams.Gender))
        //         userParams.Gender = gender == "male" ? "female" : "male";

        //     var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);

        //     Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
        //         users.TotalCount, users.TotalPages);

        //     return Ok(users);
        // }

        // [HttpGet("{username}", Name = "GetUser")]
        // public async Task<ActionResult<MemberDto>> GetUser(string username)
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