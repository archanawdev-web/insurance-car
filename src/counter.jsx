import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md inline-block">
      <h3 className="text-xl font-bold mb-2">Counter: {count}</h3>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-2"
      >
        +
      </button>
      <button
        onClick={() => setCount(count - 1)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        -
      </button>
    </div>
  );
}
