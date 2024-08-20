
using API.DTOs.CustomerDTOs;
using API.Helpers;
using API.RequestParams;

namespace API.Interfaces
{
    public interface ICustomerService
    {
        Task<PagedList<CustomerDto>> GetCustomersAsync(CustomerParams customerParams);
        Task<CustomerDto> GetCustomerByIdAsync(int id);
        Task<CustomerDto> AddCustomerAsync(CustomerSaveDto model);
        Task UpdateCustomerAsync(int id, CustomerSaveDto model);
        Task DeleteCustomerAsync(int id);
    }
}