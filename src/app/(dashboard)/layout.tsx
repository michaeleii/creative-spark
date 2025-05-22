import type { ReactNode } from "react";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-dvh space-y-8">
      <Navbar />
      {children}
    </main>
  );
}
