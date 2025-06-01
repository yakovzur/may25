'use client';

import { useTransition } from 'react';

export default function DeleteBlogButton({ onDelete }: { onDelete: () => void }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="text-red-600 hover:underline"
      disabled={isPending}
      onClick={() => {
        if (confirm('Are you sure you want to delete this post?')) {
          startTransition(onDelete);
        }
      }}
    >
      Delete
    </button>
  );
}