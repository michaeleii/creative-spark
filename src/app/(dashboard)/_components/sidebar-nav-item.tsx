"use client";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActivePath = isActive ?? pathname === href;
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center gap-x-2 rounded-xl bg-transparent px-3 py-3 transition hover:bg-white",
          isActivePath ? "bg-white" : ""
        )}
      >
        <Icon className="size-4 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}
