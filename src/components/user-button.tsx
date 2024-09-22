"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Loader2, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function UserButton() {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data.user?.name ?? "";
  const image = session.data.user?.image ?? "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* TODO: Add crown if user is premium */}
        <Avatar>
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="flex items-center justify-center bg-blue-500 font-medium text-white">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem
          disabled={false}
          onClick={() => {}}
          className="flex h-10 items-center gap-2"
        >
          <CreditCard className="size-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={false}
          onClick={async () => await signOut()}
          className="flex h-10 items-center gap-2"
        >
          <LogOut className="size-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
