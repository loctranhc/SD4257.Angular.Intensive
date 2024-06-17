using API.Models;
using Application.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Task = Application.Entities.Task;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskController(ITaskService taskService) : ControllerBase
{
    private readonly ITaskService _taskService = taskService;
    
    [HttpGet]
    public async Task<ActionResult> GetTasksByUserId(
        [FromQuery] GetTasksQueryParameter query)
    {
        var result = await _taskService.GetTasksByUserIdAsync(
            query.UserId,
            query.Status,
            query.Priority);
        return Ok(result);
    }
    
    [HttpPost("upsert")]
    public async Task<ActionResult> UpsertAsync([FromBody] Task task)
    {
        var result = await _taskService.UpsertAsync(task);
        return Ok(result);
    }   
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> RemoveAsync(int id)
    {
        var result = await _taskService.RemoveAsync(id);
        return Ok(result);
    }
}