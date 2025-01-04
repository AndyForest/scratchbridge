import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scratch Bridge PoC',
  description: 'A system that helps Scratchers utilize AI to bring their ideas to life by converting JavaScript code to and from into Scratch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-gray-900 text-gray-200`}>
        {children}
      </body>
    </html>
  );
}
