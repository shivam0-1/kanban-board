import { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAddTask({
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      priority,
      status: "todo",
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-3 mb-4 flex flex-col md:flex-row gap-2"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
