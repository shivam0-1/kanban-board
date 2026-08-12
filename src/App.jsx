import { useState } from "react";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design homepage",
      description: "Create wireframes in figma",
      priority: "medium",
      status: "todo",
    },
    {
      id: 2,
      title: "Set up Databse",
      description: "Configure MongoDB schema",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Write ReadME",
      description: "Document setup instructions",
      priority: "low",
      status: "done",
    },
  ]);
  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Kanban Board</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <div className="flex flex-col md:flex-row gap-4">
        <Column title="Todo" tasks={tasks.filter((t) => t.status === "todo")} />
        <Column
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "in-progress")}
        />
        <Column title="Done" tasks={tasks.filter((t) => t.status === "done")} />
      </div>
    </div>
  );
}

export default App;
