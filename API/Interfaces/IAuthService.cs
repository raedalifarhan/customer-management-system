using API.Models;

namespace API.Interfaces
{
    public interface IAuthService
    {
        Task<string> CreateToken(AppUser user);
    }
}