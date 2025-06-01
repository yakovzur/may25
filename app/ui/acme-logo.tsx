import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/tzur.ico"
        alt="Tzur Logo"
        width={48}
        height={48}
        className="h-16 w-16 rounded-full"
      />
      <p className="text-[44px] ml-4">LouieNina</p>
    </div>
  );
}