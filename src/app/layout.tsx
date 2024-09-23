import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Drawing Board",
  description: "Create whatever you want",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-dvh">
        <body className={cn(inter.className, "h-dvh antialiased")}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
