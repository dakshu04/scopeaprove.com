import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { requireUser } from "@/lib/auth-session";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ScopeYes",
  description: "Keep project scope clear and approve changes before work begins.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
