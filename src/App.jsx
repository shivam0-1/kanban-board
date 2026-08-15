import { useState, useEffect } from "react";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
const STORAGE_KEY = "kanban-tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    let saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // function handleAddTask(newTask) {
  //   setTasks([...tasks, newTask]);
  // }

  function handleOpenAddModal() {
    setEditingTask(null);
    setIsModelOpen(true);
  }

  function handleOpenEditModal(task) {
    setEditingTask(task);
    setIsModelOpen(true);
  }

  function handleCloseModal() {
    setIsModelOpen(false);
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
        <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>

        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          +Add New Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Column
          title="todo"
          tasks={tasks.filter((t) => t.status === "todo")}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
        />
        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "in-progress")}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === "done")}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
        />
      </div>
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
