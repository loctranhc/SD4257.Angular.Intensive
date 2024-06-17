using API.Models;
using Application.Entities;
using Application.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync([FromBody] LoginRequest payload)
    {
        var result = await _userService.LoginAsync(payload.UserName, payload.Password);
        return Ok(result);
    }
    
    [HttpPost("upsert")]
    public async Task<ActionResult> UpsertAsync([FromBody] User user)
    {
        var result = await _userService.UpsertAsync(user);
        return Ok(result);
    }
}