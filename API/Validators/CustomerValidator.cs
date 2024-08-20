using API.DTOs.CustomerDTOs;
using FluentValidation;

namespace API.Validators
{
    public class CustomerValidator : AbstractValidator<CustomerSaveDto>
{
    public CustomerValidator()
    {
        RuleFor(c => c.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .Length(1, 50).WithMessage("First name must be between 1 and 50 characters.");

        RuleFor(c => c.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .Length(1, 50).WithMessage("Last name must be between 1 and 50 characters.");

        RuleFor(c => c.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .Length(1, 100).WithMessage("Email must be between 1 and 100 characters.");

        RuleFor(c => c.Phone)
            .Length(0, 20).WithMessage("Phone number must be up to 20 characters.");

        RuleFor(c => c.Address)
            .Length(0, 255).WithMessage("Address must be up to 255 characters.");
    }
}
}
