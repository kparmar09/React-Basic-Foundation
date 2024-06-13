import { useEffect, useState } from "react";
import { ToDoProvider } from "./context/ToDoContext";
import { ToDoForm, ToDoItem } from "./components/index";

function App() {
  // Implementation of variables and functions from the ToDoContext :--

  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => {
      return [...prev, { id: Date.now(), ...todo }];
    });
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => {
        return prevTodo.id === id ? todo : prevTodo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // To get todos from local storage when the browser is refreshed
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // To set todos in the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ToDoProvider
      value={{ todos, addToDo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => {
              return (
                <div key={todo.id} className="w-full">
                  <ToDoItem todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
