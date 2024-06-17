using Application.DbContexts;
using Application.Entities;
using Application.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class UserService(ApplicationDbContext dbContext) : IUserService
{
    public async Task<User?> LoginAsync(string userName, string password)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(user => user.UserName.Equals(userName) & user.Password.Equals(password));
        return user ?? null;
    }

    public async Task<User> UpsertAsync(User user)
    {
        var currentUser = await dbContext.Users.FirstOrDefaultAsync(x => x.UserName.Equals(user.UserName));

        if (currentUser is not null)
        {
            currentUser.Password = user.Password;
            currentUser.FullName = user.FullName;
            await dbContext.SaveChangesAsync();
            
            return currentUser;
        }
        
        var newUser = await dbContext.Users.AddAsync(user);
        await dbContext.SaveChangesAsync();
        return newUser.Entity;
    }
}