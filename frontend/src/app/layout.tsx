import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import SocketProvider from "@/providers/socket-provider";
import { AppProvider } from "@/context/app-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Lift Tracking System",
  description: "Enterprise Real-Time Elevator Monitoring Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-background text-white antialiased`}
      >
        <QueryProvider>
          <AppProvider>
            <SocketProvider />
            {children}
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}