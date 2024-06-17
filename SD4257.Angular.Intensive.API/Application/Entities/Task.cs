using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Entities;

[Table("Tasks")]
public class Task
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string TaskName { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;

    [Required] 
    public string Priority { get; set; } = "High";
    
    [Required] 
    public string Status { get; set; } = "New";

    [Required] public DateTime ExpiredDate { get; set; } = DateTime.Now.AddDays(1);
    public int UserId { get; set; }
}