import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="w-full align-middle ml-96">
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
