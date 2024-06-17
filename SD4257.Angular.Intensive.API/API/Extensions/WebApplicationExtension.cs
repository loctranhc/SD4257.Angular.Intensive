using Application.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class WebApplicationExtension
{
    public static void MigrateDbContext(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();
    }
}