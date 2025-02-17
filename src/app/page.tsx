import { TodoItem } from '@/components/TodoItem';
import prisma from '@/db'
import Link from 'next/link'
import { Suspense } from 'react'

async function toggleTodo(id: string, completed: boolean) {
  'use server'
  await prisma.todo.update({ where: { id }, data: { completed } })
}

async function deleteTodo(id: string) {
  'use server'
  await prisma.todo.delete({ where: { id } })
}

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <>
      <header className="flex justify-between px-8 pt-8 pb-2 items-center border-b-2 mx-3">
        <span className='text-5xl'> Todo List </span>
        <Link href='/new' className='text-lg border px-3 py-1 rounded-md hover:text-black hover:bg-white transition duration-500 hover:translate-y-[-5px]'> New </Link>
      </header>
      <ul className="m-4 border text-xl rounded-md py-2 px-3">
        {
          todos.map(todo => (
              <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          ))}
      </ul>
    </>
  );
}
