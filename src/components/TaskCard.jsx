const priorityColors = {
  low: "bg-green-500 text-white-700",
  medium: "bg-yellow-500 text-white-700",
  high: "bg-red-500 text-white-700",
};

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 border rounded p-2">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{task.title}</h3>

        <span
          className={`text-xs px-2 py-0.5 rounded ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}

      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(task)} className="text-sm text-blue-700">
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
