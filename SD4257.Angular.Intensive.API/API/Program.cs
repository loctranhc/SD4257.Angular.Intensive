using API.Extensions;
using Application.DbContexts;
using Application.Services;
using Application.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

var corsPolicyName = "Default";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("Default");
    options.UseSqlServer(connectionString);
});
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});

var app = builder.Build();
app.MapControllers();
app.MigrateDbContext();
app.UseCors(corsPolicyName);
app.Run();
