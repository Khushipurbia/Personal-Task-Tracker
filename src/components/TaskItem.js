import React, { useState } from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const toggleComplete = () =>
    updateTask({ ...task, completed: !task.completed });

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) deleteTask(task.id);
  };

  const handleSave = () => {
    updateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }/>
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <input
            type="text"
            value={editedTask.category}
            onChange={(e) =>
              setEditedTask({ ...editedTask, category: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>
            <strong>Priority:</strong>{" "}
            <span
              className={`priority ${
                task.priority ? task.priority.toLowerCase() : ""
              }`}
            >
              {task.priority || "Not set"}
            </span>
          </p>
          <p><strong>Due:</strong> {task.dueDate || "No due date"}</p>
          <p><strong>Category:</strong> {task.category || "None"}</p>
        </>
      )}

      <small>{new Date(task.createdAt).toLocaleString()}</small>

      <div className="task-actions">
        <button onClick={toggleComplete}>
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>

        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;