import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative mx-auto flex w-full max-w-md flex-col space-y-6 rounded-xl bg-white p-8 shadow-lg md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-28">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800">Create your account</h1>
        <Suspense>
          <RegisterForm />
        </Suspense>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}