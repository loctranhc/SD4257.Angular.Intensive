using Application.DbContexts;
using Application.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using Task = Application.Entities.Task;

namespace Application.Services;

public class TaskService(ApplicationDbContext dbContext) : ITaskService
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    
    public async Task<Task> UpsertAsync(Task task)
    {
        var upsertTask = await GetTaskAsync(task.Id);

        if (upsertTask is not null)
        {
            upsertTask.UserId = task.UserId;
            upsertTask.TaskName = task.TaskName;
            upsertTask.Description = task.Description;
            upsertTask.Priority = task.Priority;
            upsertTask.Status = task.Status;
            upsertTask.ExpiredDate = task.ExpiredDate;
            await _dbContext.SaveChangesAsync();

            return upsertTask;
        }

        upsertTask = (await _dbContext.Tasks.AddAsync(task)).Entity;
        await _dbContext.SaveChangesAsync();

        return upsertTask;
    }

    public async Task<bool> RemoveAsync(int id)
    {
        var removedTask = await GetTaskAsync(id);

        if (removedTask is null)
            return false;
        
        _dbContext.Tasks.Remove(removedTask);
        await _dbContext.SaveChangesAsync();

        removedTask = await GetTaskAsync(id);
        
        return removedTask is null;
    }

    public async Task<Task?> GetTaskAsync(int id)
    {
        return await _dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Task>> GetTasksByUserIdAsync(int userId, string status, string priority)
    {
        var tasks = _dbContext.Tasks.Where(x => x.UserId == userId);
        
        if (!string.IsNullOrEmpty(status) && string.IsNullOrEmpty(priority))
            return tasks.Where(x => x.Status == status);
        if (string.IsNullOrEmpty(status) && !string.IsNullOrEmpty(priority))
            return tasks.Where(x => x.Priority == priority);
        
        return await tasks.Where(x => x.Status == status && x.Priority == priority).ToListAsync();
    }
}