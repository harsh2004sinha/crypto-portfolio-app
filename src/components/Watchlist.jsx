"use client"

import { useState, useEffect } from 'react'
import { TodoProvider } from '@/context'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
import { Vortex } from './ui/vortex'
import styled from 'styled-components';


function Watchlist() {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleComplete = (id) => {
        //console.log(id);
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id ? {
                    ...prevTodo,
                    completed: !prevTodo.completed
                } : prevTodo))
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))

        if (todos && todos.length > 0) {
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className='-mt-20'>
                <Vortex className='h-screen'>
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">My WatchList</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    {todos.length===0 ? null : <ScrollableContainer className='flex-col'>
                        {todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </ScrollableContainer>}
                    
                </div>
                </Vortex>
            </div>
        </TodoProvider>
    )
}

const ScrollableContainer = styled.div`
  display: flex;
  gap: 12px; // Equivalent to Tailwind's gap-y-3
  overflow-y: scroll;
  height: 24rem; // Equivalent to Tailwind's h-96
  -ms-overflow-style: none; // For Internet Explorer and Edge
  scrollbar-width: none; // For Firefox

  &::-webkit-scrollbar {
    display: none; // For Chrome, Safari, and Opera
  }
`;

export default Watchlist
