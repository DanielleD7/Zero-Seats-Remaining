
import { Suspense } from 'react'
import type { Metadata } from "next";
import { AnimatePresence } from 'framer-motion';
import { AccountProvider } from "@/components/meta/context"
import LayoutClient from './layout-client';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Regilax",
  description: "Sleek and modern and very good, deserves a 100, student class registration app",
};

export default function RootLayout({children} : Readonly<{children : React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutClient>
          <AccountProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </AccountProvider>
        </LayoutClient>
      </body>
    </html>
  );
}
