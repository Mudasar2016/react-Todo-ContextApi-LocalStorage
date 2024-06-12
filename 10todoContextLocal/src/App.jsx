import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoContextProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todoObj) => {
    setTodos((preTodoList) => [todoObj, ...preTodoList])
  }

  const updateTodo = (id, todoObj) => {
    setTodos((preTodoList) => preTodoList.map((prevTodo) => (prevTodo.id === id ? todoObj : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((preTodoList) => preTodoList.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((preTodoList) => preTodoList.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
  }

  useEffect(() => {
    const todosArray = JSON.parse(localStorage.getItem("TODO_LIST"));

    if (todosArray && todosArray.length > 0) {
      setTodos(todosArray);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("TODO_LIST",JSON.stringify(todos))
  }, [todos])



  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos?.map((todo) => (
                <div className='w-full' key={todo.id}>
                  <TodoItem todo={todo}/>
                </div>
              )) 
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
