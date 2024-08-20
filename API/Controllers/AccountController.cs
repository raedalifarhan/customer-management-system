using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Models.Identity;
using API.Interfaces;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IAuthService _authService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager,
            DataContext context,
            IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginWithEmailAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            //var token = _authService.CreateToken(user);

            if (result)
            {
                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterWithEmailAsync(RegisterDto model)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError("email", "Email Taken");
                return ValidationProblem("Email Taken");
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == model.Username))
            {
                ModelState.AddModelError("username", "Username Taken");
                return ValidationProblem("Username Taken");
            }

            var user = new AppUser
            {
                DisplayName = model.DisplayName,
                Email = model.Email,
                UserName = model.Username,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (user is null) BadRequest("Retry, this user not found");

            var roles = await _userManager.GetRolesAsync(user!);

            if (roles is null) { BadRequest("Retry, this user not found"); }

            return new UserDto
            {
                Id = user!.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = await _authService.CreateToken(user)

            };
        }

        private async Task<ActionResult<UserDto>> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
            };
        }
        private async Task<ActionResult<UserDto>> CurrentUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
            };
        }
    }
}