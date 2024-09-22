import type { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-dvh bg-muted">
      <Sidebar />
      <div className="flex h-dvh flex-col lg:pl-[300px]">
        <Navbar />
        <main className="flex-1 overflow-auto rounded-tl-2xl bg-white p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
