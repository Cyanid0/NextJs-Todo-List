import Link from 'next/link'
import styles from './new.module.css'
import prisma  from '@/db'
import { redirect } from 'next/navigation';

async function createTodo(data: FormData) {
  "use server"
  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || !title) {
    throw new Error('Invalid Title')
  }

  await prisma.todo.create({ data: { title, completed: false } })
  redirect('..')
}

export default function New() {
  return (
    <>
      <header className="flex justify-between px-8 pt-8 pb-3 items-center border-b-2 mx-4">
        <span className='text-5xl'> New</span>
      </header>
      <form action={createTodo} className='flex flex-col max-w-[()] gap-8 m-8 p-5 mx-auto'>
        <input type='text' name='title' className='border border-slate-400 rounded-md px-3 py-2 bg-transparent focus-within:border-slate-100 outline-none transition-all duration-500' />
        <div className='flex gap-1 justify-end'>
          <Link href='..' className={styles['button']}> Cancel </Link>
          <button type='submit' className={styles['button']}> Save </button>
        </div>
      </form>
    </>
  )
}
