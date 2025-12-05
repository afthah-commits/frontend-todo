import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./styles.css";
import axios from "axios";

// 🔥 Your Render backend URL
const BASE_URL = "https://backend-todo-owr5.onrender.com/api";

// Full correct endpoints
const GET_TASKS = `${BASE_URL}/tasks/`;
const ADD_TASK = `${BASE_URL}/tasks/add/`;

function filterTasks(tasks, filter) {
  if (filter === "completed") return tasks.filter(t => t.completed);
  if (filter === "pending") return tasks.filter(t => !t.completed);
  return tasks;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Load all tasks
  useEffect(() => {
    axios
      .get(GET_TASKS)
      .then(res => setTasks(res.data))
      .catch(err => console.error("GET error:", err));
  }, []);

  // Add a new task
  const addTask = (task) => {
    axios
      .post(ADD_TASK, task)
      .then(res => setTasks(prev => [res.data, ...prev]))
      .catch(err => console.error("POST error:", err));
  };

  // Update task
  const updateTask = (updated) => {
    axios
      .put(`${BASE_URL}/tasks/${updated.id}/`, updated)
      .then(res => {
        setTasks(prev =>
          prev.map(t => (t.id === updated.id ? res.data : t))
        );
        setEditingTask(null);
      })
      .catch(err => console.error("PUT error:", err));
  };

  // Delete task
  const deleteTask = (id) => {
    axios
      .delete(`${BASE_URL}/tasks/${id}/delete/`)
      .then(() => setTasks(prev => prev.filter(t => t.id !== id)))
      .catch(err => console.error("DELETE error:", err));
  };

  // Toggle completed state
  const toggleTask = (task) => {
    axios
      .put(`${BASE_URL}/tasks/${task.id}/`, {
        ...task,
        completed: !task.completed
      })
      .then(res =>
        setTasks(prev =>
          prev.map(t => (t.id === task.id ? res.data : t))
        )
      )
      .catch(err => console.error("Toggle error:", err));
  };

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div className="app">
      <h2>Todo List</h2>

      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        cancelEdit={() => setEditingTask(null)}
      />

      <FilterBar filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={visibleTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={(t) => setEditingTask(t)}
      />
    </div>
  );
}
