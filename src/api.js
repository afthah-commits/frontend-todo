const BASE_URL = "https://backend-todo-3-7nw8.onrender.com/api";

export default {
    getTasks: () => fetch(`${BASE_URL}/tasks/`).then(res => res.json()),

    addTask: (task) =>
        fetch(`${BASE_URL}/tasks/add/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        }).then(res => res.json()),

    updateTask: (id, task) =>
        fetch(`${BASE_URL}/tasks/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        }).then(res => res.json()),

    deleteTask: (id) =>
        fetch(`${BASE_URL}/tasks/${id}/delete/`, {
            method: "DELETE",
        }).then(res => res.json()),
};
