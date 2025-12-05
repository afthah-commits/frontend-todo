import React from "react";

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className="task">
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
        <div style={{minWidth:200}} className={task.completed ? "completed" : ""}>
          {task.title}
        </div>
      </div>
      <div>
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
