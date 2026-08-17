import { useState, useEffect } from "react";

function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    onSave({
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      priority,
      status: taskToEdit ? taskToEdit.status : "todo",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="task-title" className="text-sm text-gray-600">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="task-description" className="text-sm text-gray-600">
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-2 py-1"
              rows="3"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="task-priority" className="text-sm text-gray-600">
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
