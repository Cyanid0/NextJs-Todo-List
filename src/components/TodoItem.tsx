'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { FaTrash, FaEdit } from 'react-icons/fa';
type TodoItemProps = {
  id: string,
  title: string,
  completed: boolean,
  toggleTodo: (id: string, completed: boolean) => void
  deleteTodo: (id: string) => void
}

export function TodoItem({ id, title, completed, toggleTodo, deleteTodo }: TodoItemProps) {

  const [isComplete, setIsComplete] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    setIsComplete(completed);
  }, []);

  return (
    isDeleted ? null :
    <li className="flex justify-between items-center border-b border-slate-900">
      <div className="flex gap-4 items-center">
        <input id={id} type="checkbox" className="cursor-pointer peer" defaultChecked={completed} onChange={e => { 
          toggleTodo(id, e.target.checked)
          setIsComplete(e.target.checked)
        }} />
        <label htmlFor={id} className="peer-checked:line-through peer-checked:text-slate-500">
          {title}
        </label>
      </div>
      <div className="flex gap-3" >
      <Link href={`/edit/${id}`} className="text-xl text-white cursor-pointer">
        <FaEdit className="text-xl text-white cursor-pointer" />
      </Link>
      {isComplete && 
        <span className="text-xl text-white cursor-pointer" onClick={() => {
          deleteTodo(id)
          setIsDeleted(true)
        }}>
          <FaTrash />
        </span>
      }
      </div>
    </li>
  )
}
