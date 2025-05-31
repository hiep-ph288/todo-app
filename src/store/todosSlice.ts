import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type Filter = "all" | "completed" | "pending";

interface TodosState {
  todos: Todo[];
  filter: Filter;
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, setFilter } =
  todosSlice.actions;

export default todosSlice.reducer;
