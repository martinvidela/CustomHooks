import React, { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = (initialState = []) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const deleteTodo = (id) => {
    const action = {
      type: "Remove Todo",
      payload: id,
    };
    dispatch(action);
  };

  const handleToggleTodo = (id) => {
    const action = {
      type: "Toggle Todo",
      payload: id,
    };
    dispatch(action);
  };

  return {
    handleNewTodo,
    deleteTodo,
    handleToggleTodo,
    todos,
    todosCount: todos.length,
    PendingTodos: todos.filter(todo=> !todo.done).lenght
  };
};
