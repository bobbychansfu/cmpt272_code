import { useState } from "react";
import "./App.css";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <h3>Todo List</h3>

      <form onSubmit={addTodo}>
        <label htmlFor="todo-input">New task </label> 
        <input
          id="todo-input"
          value={input}
          style={{ marginRight: "0.5rem", fontSize: "1rem" }}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <>
          <p>{remaining} task{remaining !== 1 ? "s" : ""} remaining</p>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  aria-label={`Mark "${todo.text}" as done`}
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{ textDecoration: todo.done ? "line-through" : "none" }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type NameFormProps = { onSubmit: (name: string) => void };

export function NameForm({ onSubmit }: NameFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={!name.trim()}>
        Submit
      </button>
    </form>
  );
}

export default function App() {
  return (
    <>
      <TodoApp />
      <hr />
    </>
  );
}
