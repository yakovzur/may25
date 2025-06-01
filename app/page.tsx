import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Full-width header with logo and LouieNina on the left (port side) */}
      <div className="w-full flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="flex items-center gap-4">
          <div className="w-24 text-white md:w-32">
            <AcmeLogo />
          </div>
        </div>
      </div>
      {/* Increased gap between text and image */}
      <div className="mt-4 flex flex-col md:flex-row gap-12 grow w-full max-w-5xl">
        <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20 flex-1">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to LouieNina.</strong>
            , brought to you by Tzur
          </p>
          <div className="flex gap-8">
            <Link
              href="/login"
              className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span>
            </Link>
            <Link
              href="/login/register"
              className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Register</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center md:w-2/5 w-full">
          <Image
            src="/Louie.jpg"
            alt="Louie"
            width={350}
            height={350}
            className="rounded-xl object-cover w-full max-w-xs md:max-w-full"
            priority
          />
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p className="text-sm">
          LouieNina is your site to go.
        </p>
        <p className="text-xs">
          © {new Date().getFullYear()} LouieNina. All rights reserved.
        </p>
      </div>
    </main>
  );
}
