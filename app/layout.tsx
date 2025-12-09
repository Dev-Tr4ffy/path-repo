import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'HR Disciplinary Action Tool',
  description: 'Manage HR incidents',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
