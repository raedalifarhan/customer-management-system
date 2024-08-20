using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {

        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager,
            ILoggerFactory loggerFactory)
        {
            try
            {
                // Users
                if (!userManager.Users.Any())
                {
                    // Create a Supper user
                    var supperUser = new AppUser
                    {
                        DisplayName = "Manager",
                        UserName = "Manager",
                        Email = "manager@manager.com"
                    };

                    // Supper user password
                    var createdSupperUser = await userManager.CreateAsync(supperUser, "Passw0rd");
                }

                // Users
                if (!context.Customers.Any())
                {
                    context.Customers.AddRange(new Customer
                    {
                        FirstName = "bob",
                        LastName = "faraj",
                        Email = "bob@bob.com",
                        Address = "Dubai, UAE",
                        Phone = "+971000000000"
                    },
                    new Customer
                    {
                        FirstName = "hani",
                        LastName = "hamad",
                        Email = "hani@hani.com",
                        Address = "Sharjah, UAE",
                        Phone = "+971000000000"
                    });

                    await context.SaveChangesAsync();
                }

            }
            catch (SystemException ex)
            {
                var logger = loggerFactory.CreateLogger<Seed>();
                logger.LogError(ex.Message);
            }
        }

    }
}
