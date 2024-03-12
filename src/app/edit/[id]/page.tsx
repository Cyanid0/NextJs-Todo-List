"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { editTodo, fetchTodo } from "./actions";

export default function Edit({
  params,
}: {
  params: { id: string };
}) {
  const [title, setTitle] = useState<string>("");
  const { id } = params;

  useEffect(() => {
    async function defaultTitle() {
      const title = await fetchTodo({ id });
      setTitle(title!);
    }
    defaultTitle();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editTodo({ id, title });
  }


  return (
    <>
      <header className="flex justify-between px-8 pt-8 pb-3 items-center border-b-2 mx-4">
        <span className="text-5xl">Edit</span>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[700px] gap-8 m-8 p-5 mx-auto"
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-400 rounded-md px-3 py-2 bg-transparent focus-within:border-slate-100 outline-none transition-all duration-500"
        />
        <div className="flex gap-1 justify-end">
          <Link href=".." className={styles["button"]}>
            Cancel
          </Link>
          <button type="submit" className={styles["button"]}>
            Save
          </button>
        </div>
      </form>
    </>
  );
}
