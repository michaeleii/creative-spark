import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const isAuthenticated = !!session;
  return (
    <div className="p-4">
      {isAuthenticated ? (
        <div className="w-96">
          <code>{JSON.stringify(session, null, 2)}</code>
          <div className="mt-4">
            <Button asChild>
              <Link href="/api/auth/signout">Logout</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Button asChild>
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      )}
    </div>
  );
}
