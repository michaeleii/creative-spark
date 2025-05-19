import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { business } from "@/constants";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: business.name,
  description: business.description,
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
        <body className={cn(dmSans.className, "h-dvh antialiased")}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
