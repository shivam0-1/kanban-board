const priorityColors = {
  low: "bg-green-500 text-white-900",
  medium: "bg-yellow-500 text-white-700",
  high: "bg-red-500 text-white-700",
};

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 border rounded p-2">
      <div className="flex justify-between items-start">
        <div className="flex align-items-center gap-2">
          <span className="text-meduim font-bold">Title: </span>
          <h3 className="font-medium text-gray-800">{task.title}</h3>
        </div>

        <span
          className={`text-xs px-2 py-0.5  rounded-full font-bold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex align-items-center gap-2">
        <span className="text-meduim font-bold">Description: </span>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(task)}
          className="text-sm   px-2  rounded text-green-900 font-bold outline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm   px-2  rounded text-red-900 font-bold outline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
