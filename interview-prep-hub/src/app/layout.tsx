import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Prep Hub",
  description:
    "Organize your interview prep — questions, companies, and checklists in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
            {children}
          </main>
          <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-5 text-center text-xs text-slate-400">
              Interview Prep Hub — Built for DBS Assignment 2
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
