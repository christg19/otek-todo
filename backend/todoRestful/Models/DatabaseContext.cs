using System.Data.Entity;

namespace YourNamespace
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base("name=DatabaseContext")
        {
        }

        public DbSet<Task> Tasks { get; set; }
    }
}
