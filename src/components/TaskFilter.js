import React from "react";

function TaskFilter({ filter, setFilter, tasks }) {
  const getCount = (status) => {
    if (status === "All") return tasks.length;
    if (status === "Completed") return tasks.filter((t) => t.completed).length;
    return tasks.filter((t) => !t.completed).length;
  };

  return (
    <div className="task-filter">
      {["All", "Completed", "Pending"].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={filter === status ? "active" : ""}
        >
          {status} ({getCount(status)})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
