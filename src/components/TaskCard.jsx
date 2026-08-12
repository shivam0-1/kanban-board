const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

function TaskCard({ task }) {
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
    </div>
  );
}

export default TaskCard;
