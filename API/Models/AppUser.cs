
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string DisplayName { get; set; } = default!;
        
    }
}
