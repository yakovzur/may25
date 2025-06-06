'use client';

import { updateTodo, deleteTodo, markTodoCompleted } from './actions';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';

export default function TodoList({ initialTodos }: { initialTodos: any[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const deleteRefs = useRef<{ [key: string]: HTMLFormElement | null }>({});
  const completeRefs = useRef<{ [key: string]: HTMLFormElement | null }>({});
  const updateRefs = useRef<{ [key: string]: HTMLFormElement | null }>({});

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
    deleteRefs.current[id]?.requestSubmit();
  };

  const handleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: true } : todo
      )
    );
    completeRefs.current[id]?.requestSubmit();
  };

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleSave = (id: string) => {
    updateRefs.current[id]?.requestSubmit();
    setEditingId(null);
    setEditValue('');
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo: any) => (
        <li key={todo._id} className="flex items-center gap-2">
          {/* Edit/Save Form */}
          <form
            ref={el => { updateRefs.current[todo._id] = el; }}
            action={updateTodo}
            className="flex-1 flex gap-1"
            onSubmit={e => {
              if (todo.completed) e.preventDefault();
              else handleSave(todo._id);
            }}
          >
            <input type="hidden" name="id" value={todo._id} />
            {editingId === todo._id ? (
              <input
                name="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                className="flex-1 p-2 text-right border-2 border-blue-500 bg-blue-50 rounded shadow focus:ring-2 focus:ring-blue-300 text-xl"
                dir={/[\u0590-\u05FF]/.test(todo.text) ? "rtl" : "ltr"}
                required
                autoFocus
                placeholder="Edit and press Save"
              />
            ) : todo.completed ? (
              <span
                className="flex-1 p-2 text-right text-xl line-through text-gray-400"
                dir={/[\u0590-\u05FF]/.test(todo.text) ? "rtl" : "ltr"}
              >
                {todo.text}
              </span>
            ) : (
              <span
                className="flex-1 p-2 text-right text-xl"
                dir={/[\u0590-\u05FF]/.test(todo.text) ? "rtl" : "ltr"}
              >
                {todo.text}
              </span>
            )}
            {/* Edit/Save/Cancel Buttons */}
            {editingId === todo._id ? (
              <>
                <button
                  type="submit"
                  className="p-2 rounded bg-green-600 text-white shadow hover:bg-green-700 transition flex items-center justify-center"
                  title="Save"
                  aria-label="Save"
                >
                  <span className="text-lg text-black text-center">S</span>
                </button>
                <button
                  type="button"
                  className="p-2 rounded bg-gray-300 text-gray-700 shadow hover:bg-gray-400 transition flex items-center justify-center"
                  title="Cancel"
                  aria-label="Cancel"
                  onClick={handleCancel}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                className="p-1 rounded flex items-center justify-center"
                title="Edit"
                disabled={todo.completed}
                onClick={() => handleEdit(todo._id, todo.text)}
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            )}
          </form>
          {/* Hidden form for delete */}
          <form
            ref={el => { deleteRefs.current[todo._id] = el; }}
            action={deleteTodo}
            style={{ display: 'none' }}
          >
            <input type="hidden" name="id" value={todo._id} />
          </form>
          {/* Hidden form for complete */}
          <form
            ref={el => { completeRefs.current[todo._id] = el; }}
            action={markTodoCompleted}
            style={{ display: 'none' }}
          >
            <input type="hidden" name="id" value={todo._id} />
          </form>
          <button
            type="button"
            className="p-1 rounded flex items-center justify-center"
            title="Delete"
            onClick={() => handleDelete(todo._id)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded flex items-center justify-center"
            title="Mark as Completed"
            disabled={todo.completed}
            onClick={() => handleComplete(todo._id)}
          >
            <CheckIcon className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}