import React from "react";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter">
      <button className="btn" onClick={() => setFilter("all")} style={{marginRight:6}}>All</button>
      <button className="btn" onClick={() => setFilter("pending")} style={{marginRight:6}}>Pending</button>
      <button className="btn" onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}
