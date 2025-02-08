

"use client"; 

import { SessionProvider } from "next-auth/react";
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Koleksiyon Yönetim Paneli</title>
      </head>
      <body>
        <SessionProvider>
          {children} {/* Renders page content */}
        </SessionProvider>
      </body>
    </html>
  );
}
