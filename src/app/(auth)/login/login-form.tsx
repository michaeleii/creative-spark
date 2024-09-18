"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/logo";

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <div className="mx-auto">
          <Logo />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            onClick={() => signIn("google")}
            size="lg"
            className="flex w-full items-center gap-4"
          >
            <FcGoogle className="size-5" />
            Login with Google
          </Button>
          <Button
            onClick={() => signIn("discord")}
            size="lg"
            className="flex w-full items-center gap-4"
          >
            <FaDiscord className="size-5" />
            Login with Discord
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
