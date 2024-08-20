using API.DTOs.CustomerDTOs;
using API.Models;
using AutoMapper;

namespace API.Mappings
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerSaveDto, Customer>(); 
        }
    }
}