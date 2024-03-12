"use server"
import prisma from '@/db'
import { redirect } from 'next/navigation'

export async function fetchTodo({ id }: { id: string }) {
  const todo = await prisma.todo.findUnique({ where: { id } })
  if (todo) {
    return (todo.title)
  }
}

export async function editTodo({id, title}:{id:string, title:string}) {
  const newTitle = title
  console.log(newTitle,id)
  if (typeof newTitle !== 'string' || !newTitle) {
    throw new Error('Invalid Title')
  }
  await prisma.todo.update({
    where: { id }, data: {
      title: newTitle
    }
  })
  redirect('..');
}

