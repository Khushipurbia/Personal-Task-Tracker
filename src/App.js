import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { saveTasks, loadTasks } from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const filteredTasks = tasks.filter((t) => {
    const match =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "All") return match;
    if (filter === "Completed") return t.completed && match;
    return !t.completed && match;
  });

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <h2>Hello, {user}</h2>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <TaskForm addTask={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
