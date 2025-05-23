"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa6";
import { signIn } from "@/lib/auth-client";
import { Logo } from "@/components/logo";
import { BsIncognito } from "react-icons/bs";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
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
            onClick={async () =>
              signIn.social({
                provider: "google",
              })
            }
            size="lg"
            className="flex w-full items-center gap-4"
          >
            <FcGoogle className="size-5" />
            Login with Google
          </Button>
          <Button
            onClick={async () =>
              signIn.social({
                provider: "discord",
              })
            }
            size="lg"
            className="flex w-full items-center gap-4"
          >
            <FaDiscord className="size-5" />
            Login with Discord
          </Button>
          <Button
            onClick={async () =>
              signIn.anonymous({
                fetchOptions: {
                  onSuccess: () => {
                    router.refresh();
                  },
                },
              })
            }
            size="lg"
            className="flex w-full items-center gap-4"
          >
            <BsIncognito className="size-5" />
            Log in Anonymously
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
