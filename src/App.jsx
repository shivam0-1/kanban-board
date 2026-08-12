import Column from "./components/Column";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Kanban Board</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Column title="Todo" />
        <Column title="In Progress" />
        <Column title="Done" />
      </div>
    </div>
  );
}

export default App;
