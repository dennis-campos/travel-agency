import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';
import { Toaster } from 'react-hot-toast';
import { validateRequest } from '@/auth/lucia';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  console.log({ user });

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-4">
          <Navbar user={user} />
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
