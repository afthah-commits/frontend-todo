import React, { useState, useEffect } from "react";

export default function TaskForm({ onAdd, onUpdate, editingTask, cancelEdit }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) setTitle(editingTask.title);
    else setTitle("");
  }, [editingTask]);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return alert("Task name is required");
    if (editingTask) {
      onUpdate({ ...editingTask, title: trimmed });
    } else {
      onAdd({ title: trimmed, completed: false });
    }
    setTitle("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        className="input"
        placeholder="Enter task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn" type="submit">{editingTask ? "Save" : "Add"}</button>
      {editingTask && <button className="btn" type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
