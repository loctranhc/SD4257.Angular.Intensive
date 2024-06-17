using Application.Entities;
using Microsoft.EntityFrameworkCore;
using Task = Application.Entities.Task;

namespace Application.DbContexts;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}