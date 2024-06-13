import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addToDo } = useToDo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addToDo({ todo: todo, completed: false }); // id not passed as it is created in the function itself (refer App.jsx)
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
