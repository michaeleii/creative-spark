"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import SidebarNavItem from "./sidebar-nav-item";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="px-4">
        <Button
          className="flex w-full items-center gap-x-2 rounded-xl border-none transition hover:bg-white hover:opacity-75"
          variant="outline"
          size="lg"
        >
          <Crown className="size-4 fill-yellow-500 text-yellow-500" />
          <span>Upgrade to Pro</span>
        </Button>
        <Separator className="my-2 px-3" />
        <ul className="flex flex-col gap-y-1 px-3">
          <SidebarNavItem href="/" icon={Home} label="Home" />
        </ul>
        <Separator className="my-2 px-3" />
        <ul className="flex flex-col gap-y-1 px-3">
          <SidebarNavItem
            href={pathname}
            icon={CreditCard}
            label="Billing"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarNavItem
            href="mailto:support@thedrawingboard.com"
            icon={MessageCircleQuestion}
            label="Get Help"
            isActive={false}
          />
        </ul>
      </div>
    </div>
  );
}
