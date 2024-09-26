import type { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh bg-muted">
      <Sidebar />
      <div className="flex min-h-dvh flex-col bg-muted p-8 lg:pl-[320px]">
        <main className="flex-1 rounded-2xl border bg-white p-8 pt-4">
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
