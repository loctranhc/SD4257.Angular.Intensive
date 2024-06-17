using Application.Entities;

namespace Application.Services.Abstractions;

public interface IUserService
{
    Task<User?> LoginAsync(string userName, string password);
    Task<User> UpsertAsync(User user);
}