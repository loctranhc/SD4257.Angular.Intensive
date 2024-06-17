using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Application.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(64)]
        public string FullName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(25)]
        public string UserName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        public string Password { get; set; } = string.Empty;
        
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public virtual ICollection<Task> Tasks { get; set; } = Array.Empty<Task>();
    }
}