function Column({ title }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 w-full md:w-1/3">
      <h2 className="font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="space-y-2 min-h-[200px]"></div>
    </div>
  );
}

export default Column;
