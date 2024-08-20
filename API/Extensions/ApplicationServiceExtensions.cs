using API.Data;
using API.Interfaces;
using API.Mappings;
using API.Services;
using API.Validators;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();

            services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CustomerValidator>());


            services.AddMvc();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(config.GetConnectionString("app-conn"));
            });

            // Auto Mappers
            services.AddAutoMapper(typeof(CustomerProfile).Assembly);

            // Services
            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(ICustomerService), typeof(CustomerService));

            return services;
        }
    }
}
