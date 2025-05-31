import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";

import { motion, AnimatePresence } from "framer-motion";
import {
  addTodo,
  deleteTodo,
  editTodo,
  setFilter,
  toggleTodo,
  type Filter,
  type Todo,
} from "./store/todosSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.todos.filter);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    return !todo.completed;
  });

  const handleAdd = () => {
    if (input.trim() === "") return;
    dispatch(addTodo(input.trim()));
    setInput("");
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim() === "") return;
    dispatch(editTodo({ id, text: editText.trim() }));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="w-[500px] mx-auto p-6 bg-white text-black rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Thêm việc cần làm..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Thêm
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {(["all", "completed", "pending"] as Filter[]).map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-600 text-white" : "border border-gray-300"
            }`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f === "all"
              ? "Tất cả"
              : f === "completed"
              ? "Đã hoàn thành"
              : "Đang chờ xử lý"}
          </button>
        ))}
      </div>

      <ul>
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              layout
              className="flex items-center justify-between mb-3 p-3 border rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="w-5 h-5"
                />
                {editId === todo.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                    onBlur={() => saveEdit(todo.id)}
                    className="border-b border-blue-600 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={() => startEdit(todo)}
                    className={`select-none cursor-pointer ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label="Xóa việc"
              >
                &times;
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default App;
