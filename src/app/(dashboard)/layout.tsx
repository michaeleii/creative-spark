import type { ReactNode } from "react";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-dvh border p-8 pt-0">
      <Navbar />
      {children}
    </main>
  );
}
