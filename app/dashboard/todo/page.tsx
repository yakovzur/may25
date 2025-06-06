import { fetchTodos, addTodo } from './actions';
import { PlusIcon } from '@heroicons/react/24/outline';
import TodoList from './TodoList';



export default async function TodoPage() {
  const todos = await fetchTodos();

  // Convert _id to string for each todo
  const plainTodos = todos.map((todo: any) => ({
    ...todo,
    _id: todo._id.toString(),
  }));

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
      <TodoList initialTodos={plainTodos} />
    </main>
  );
}