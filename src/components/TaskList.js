import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (!tasks.length) return <div>No tasks yet</div>;
  return (
    <div>
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
      ))}
    </div>
  );
}
