import { fetchTodos, addTodo, updateTodo, deleteTodo } from './actions';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function TodoPage() {
  const todos = await fetchTodos();

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          name="text"
          placeholder="הוסף משימה חדשה"
          className="border p-2 rounded flex-1 text-right"
          dir="rtl"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded flex items-center justify-center"
          title="Add"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo: any) => (
          <li key={todo._id} className="flex items-center gap-2">
            <form action={updateTodo} className="flex-1 flex gap-1">
              <input type="hidden" name="id" value={todo._id.toString()} />
              <input
                name="text"
                defaultValue={todo.text}
                className="flex-1 p-2 text-right outline-none border-none shadow-none focus:ring-0 focus:border-transparent text-xl"
                style={{ border: "none", boxShadow: "none" }}
                dir={/[\u0590-\u05FF]/.test(todo.text) ? "rtl" : "ltr"}
                required
              />
              <button
                type="submit"
                className="p-1 rounded flex items-center justify-center"
                title="Update"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </form>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo._id.toString()} />
              <button
                type="submit"
                className="p-1 rounded flex items-center justify-center"
                title="Delete"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}