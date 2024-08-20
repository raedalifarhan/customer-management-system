using API.Data;
using API.DTOs.CustomerDTOs;
using API.Helpers;
using API.Interfaces;

using API.Models;
using API.RequestParams;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CustomerService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PagedList<CustomerDto>> GetCustomersAsync(CustomerParams customerParams)
        {
            var query = _context.Customers.AsNoTracking();

            return await PagedList<CustomerDto>.CreateAsync(
                query.ProjectTo<CustomerDto>(_mapper.ConfigurationProvider),
                customerParams!.PageNumber,
                customerParams.PageSize);
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with id {id} not found.");
            }
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<CustomerDto> AddCustomerAsync(CustomerSaveDto model)
        {
            try
            {
                var customer = _mapper.Map<Customer>(model);

                _context.Customers.Add(customer);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to add the customer.");
                }

                return _mapper.Map<CustomerDto>(customer);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while adding the customer: {ex.Message}");
            }
        }

        public async Task UpdateCustomerAsync(int id, CustomerSaveDto model)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);

                if (customer == null)
                {
                    throw new KeyNotFoundException($"Customer with id {id} not found.");
                }
                _mapper.Map(model, customer);
                
                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to update the customer.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the customer: {ex.Message}");
            }
        }

        public async Task DeleteCustomerAsync(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                
                if (customer == null)
                {
                    throw new KeyNotFoundException($"Customer with id {id} not found.");
                }
                _context.Remove(customer);
                
                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    throw new Exception("Failed to delete the customer.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the customer: {ex.Message}");
            }
        }

    }
}
