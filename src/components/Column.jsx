import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 w-full md:w-1/3">
      <h2 className="font-semibold text-gray-700 mb-3">
        {title} ({tasks.length})
      </h2>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
