import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[],
    addTodo: (todoObj) => {},
    updateTodo: (id, todoObj) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = ()=>{
    return useContext(TodoContext);
}