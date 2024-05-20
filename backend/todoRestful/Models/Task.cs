using System.ComponentModel.DataAnnotations;

namespace YourNamespace
{
    public class Task
    {
        [Key]
        public int? id { get; set; }
        public string title { get; set; }

        public string description { get; set; }

        public bool? isCompleted { get; set; }
    }
}
