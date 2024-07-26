import { useReducer, useEffect } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodo = () => {

  // State inicial
  const initialState = [];

  // Funcion inicializadora de useEffect
  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  // Reducer
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  // Funciones Handle
  const handleNewTodo = (todo) => {
    dispatch({ type: "[TODO] Add Todo", payload: todo });
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: "[TODO] Remove Todo", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "[TODO] Toggle Todo", payload: id });
  };

  // Guardar en LS
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  return {
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    todos,
  };
};

// El reducer no se usa, solamente se pasa la referencia a la funcion
// Si solo tenemos un reducer podemos dejar el dispatch tal cual (su nombre)
