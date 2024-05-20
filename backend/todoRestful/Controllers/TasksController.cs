using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Http;
using YourNamespace;

public class TasksController : ApiController
{
    private DatabaseContext db = new DatabaseContext();

    public IHttpActionResult GetTasks()
    {
        return Ok(db.Tasks.ToList());
    }

    public IHttpActionResult GetTask(int id)
    {
        var task = db.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    public IHttpActionResult PostTask(Task task)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        db.Tasks.Add(task);
        task.isCompleted = false;

        db.Tasks.Add(task);
        db.SaveChanges();

        return CreatedAtRoute("DefaultApi", new { id = task.id }, task);
    }

    [HttpPut]
    public IHttpActionResult PutTask(int id, [FromBody] Task task)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (id != task.id)
        {
            return BadRequest("ID mismatch.");
        }

        var existingTask = db.Tasks.Find(id);
        if (existingTask == null)
        {
            return NotFound();
        }

        existingTask.title = task.title;
        existingTask.description = task.description;
        existingTask.isCompleted = task.isCompleted;

        db.Entry(existingTask).State = EntityState.Modified;
        db.SaveChanges();

        return StatusCode(HttpStatusCode.NoContent);
    }


    public IHttpActionResult DeleteItem(int id)
    {
        var task = db.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        db.Tasks.Remove(task);
        db.SaveChanges();

        return Ok(task);
    }
}
