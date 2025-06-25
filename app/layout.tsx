import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ArtistProvider } from '@/contexts/ArtistContext';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtistHub - Artist Management Platform',
  description: 'Connect artists with opportunities and manage registrations seamlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ArtistProvider>
          <Navigation />
          {children}
        </ArtistProvider>
      </body>
    </html>
  );
}