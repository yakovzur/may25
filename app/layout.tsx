import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
 
export const metadata: Metadata = {
  title: {
    template: '%s | Louienina',
    default: 'Louienina',
  },
  description: 'The official from Tzur',
  metadataBase: new URL('https://www.louienina.com'),
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/tzur.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}