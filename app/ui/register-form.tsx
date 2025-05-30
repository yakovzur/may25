'use client';

import { useActionState } from 'react';
import { registerUser } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [error, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await registerUser(prevState, formData);
      if (!result) {
        router.push('/dashboard');
      }
      return result;
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
        minLength={6}
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}