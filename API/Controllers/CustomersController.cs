
using API.DTOs.CustomerDTOs;
using API.Interfaces;
using API.RequestParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerDto>> GetAllCustomers([FromQuery] CustomerParams customerParams)
        {
            return Ok(await _customerService.GetCustomersAsync(customerParams));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(int id)
        {
            try
            {
                return Ok(await _customerService.GetCustomerByIdAsync(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<CustomerDto>> CreateCustomer(CustomerSaveDto model)
        {
            try
            {
                var Customer = await _customerService.AddCustomerAsync(model);
                return CreatedAtAction(nameof(GetCustomer), new { id = Customer.CustomerId }, Customer);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while saving the Customer: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> UpdateCustomer(int id, CustomerSaveDto model)
        {
            try
            {
                await _customerService.UpdateCustomerAsync(id, model);
                return Ok("Update completed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while updating the Customer: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            try
            {
                await _customerService.DeleteCustomerAsync(id);
                return Ok("Delete completed Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred while deleting the Customer: {ex.Message}");
            }
        }
    }
}
