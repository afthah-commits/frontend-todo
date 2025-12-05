import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./styles.css";
import axios from "axios";

const API_URL = "https://backend-todo-owr5.onrender.com/api/tasks/";

function filterTasks(tasks, filter) {
  if (filter === "completed") return tasks.filter(t => t.completed);
  if (filter === "pending") return tasks.filter(t => !t.completed);
  return tasks;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error("GET error:", err));
  }, []);

  const addTask = (task) => {
    axios
      .post(API_URL, task)
      .then(res => {
        setTasks(prev => [res.data, ...prev]);
      })
      .catch(err => console.error("POST error:", err));
  };

  const updateTask = (updated) => {
    axios
      .put(`${API_URL}${updated.id}/`, updated)
      .then(res => {
        setTasks(prev => prev.map(t => (t.id === updated.id ? res.data : t)));
        setEditingTask(null);
      })
      .catch(err => console.error("PUT error:", err));
  };

  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}${id}/`)
      .then(() => setTasks(prev => prev.filter(t => t.id !== id)))
      .catch(err => console.error("DELETE error:", err));
  };

  const toggleTask = (task) => {
    axios
      .put(`${API_URL}${task.id}/`, { ...task, completed: !task.completed })
      .then(res => {
        setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)));
      })
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
