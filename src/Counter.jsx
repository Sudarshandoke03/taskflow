
import { useEffect, useState } from "react";
import "./index.css";

function Counter() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("taskflow-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !task.completed) ||
      (filter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>TaskFlow</span>
        </div>
        <span className="header-label">TASK MANAGER</span>
      </header>

      <section className="welcome">
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Manage your tasks.</h1>
        <p className="subtitle">
          Stay organized, focus on what matters, and get things done.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <section className="content">
        <div className="panel add-panel">
          <h2>Create a task</h2>
          <p className="panel-subtitle">
            Add a new task to your workspace.
          </p>

          <form onSubmit={addTask}>
            <label htmlFor="task-title">Task title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Complete React project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              placeholder="Add some details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />

            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button className="add-button" type="submit">
              + Add Task
            </button>
          </form>
        </div>

        <div className="panel tasks-panel">
          <div className="tasks-heading">
            <div>
              <h2>My Tasks</h2>
              <p className="panel-subtitle">
                {filteredTasks.length} task(s) shown
              </p>
            </div>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <span>✦</span>
                <h3>No tasks found</h3>
                <p>Add a task or change your search/filter.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <article
                  className={task.completed ? "task completed" : "task"}
                  key={task.id}
                >
                  <button
                    type="button"
                    className={
                      task.completed ? "check checked" : "check"
                    }
                    aria-label={
                      task.completed
                        ? "Mark as pending"
                        : "Mark as completed"
                    }
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? "✓" : ""}
                  </button>

                  <div className="task-info">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority} Priority
                    </span>
                    <span className="status">
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        TaskFlow · Built with React
      </footer>
    </main>
  );
}

export default Counter;










