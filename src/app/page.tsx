import { Button } from "@/components/ui/button";
import { protectServer } from "@/app/(auth)/utils";
import Link from "next/link";

export default async function Home() {
  await protectServer();
  return (
    <div className="p-4">
      <Button asChild>
        <Link href="/api/auth/signout">Logout</Link>
      </Button>
    </div>
  );
}
