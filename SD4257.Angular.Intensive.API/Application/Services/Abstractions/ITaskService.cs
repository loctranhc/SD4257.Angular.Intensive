using Task = Application.Entities.Task;

namespace Application.Services.Abstractions;

public interface ITaskService
{
      Task<Task> UpsertAsync(Task task);
      Task<bool> RemoveAsync(int id);
      Task<Task?> GetTaskAsync(int id);
      Task<IEnumerable<Task>> GetTasksByUserIdAsync(int userId, string status, string priority);
}