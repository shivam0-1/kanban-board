import { useState, useEffect, useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
const STORAGE_KEY = "kanban-tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    let saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasks, searchTerm]);

  function handleDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prev) => {
      return prev.map((task) => {
        return task.id === Number(draggableId)
          ? { ...task, status: destination.droppableId }
          : task;
      });
    });
  }
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function handleOpenAddModal() {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleSaveTask(task) {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    handleCloseModal();
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Kanban Task Management Board
        </h1>

        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white rounded font-bold px-4 py-2 hover:bg-blue-800"
        >
          +Add New Task
        </button>
      </div>
      <input
        type="text"
        placeholder="Search tasks by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-4">
          <Column
            title="Todo"
            status="todo"
            tasks={filteredTasks.filter((t) => t.status === "todo")}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
          />
          <Column
            title="In Progress"
            status="in-progress"
            tasks={filteredTasks.filter((t) => t.status === "in-progress")}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
          />
          <Column
            title="Done"
            status="done"
            tasks={filteredTasks.filter((t) => t.status === "done")}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
          />
        </div>
      </DragDropContext>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
}

export default App;
