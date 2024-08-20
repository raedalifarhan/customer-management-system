using API.Helpers;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly JWT _jwt;
        private readonly UserManager<AppUser> _userManager;

        public AuthService(IOptions<JWT> jwt, UserManager<AppUser> userManager )
        {
            _jwt = jwt.Value;
            _userManager = userManager;
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync( user );
            // var roles = await _userManager.GetRolesAsync( user );
            // var roleClaims = new List<Claim>();

            // foreach (var role in roles)
            //     roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.NameIdentifier, user.UserName!),

                // i removed new Claim(ClaimTypes.NameIdentifier, user.Email!),
            }
            .Union(userClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(_jwt.DurationInDays),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}