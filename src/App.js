import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./styles.css";


let nextId = 1;

function sampleTasks() {
  return [
    { id: nextId++, title: "Buy groceries", completed: false },
    { id: nextId++, title: "Read documentation", completed: true }
  ];
}

function filterTasks(tasks, filter) {
  if (filter === "completed") return tasks.filter(t => t.completed);
  if (filter === "pending") return tasks.filter(t => !t.completed);
  return tasks;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Load mock data on mount
  useEffect(() => {
    setTasks(sampleTasks());
  }, []);

  const addTask = (task) => {
    task.id = nextId++;
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = (updated) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (task) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
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
