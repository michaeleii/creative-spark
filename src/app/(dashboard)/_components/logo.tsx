import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
});

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex h-[68px] items-center gap-x-2 px-4 transition hover:opacity-75">
        <div className="relative size-8">
          <Image src="/logo.svg" alt="The Drawing Board" fill />
        </div>
        <h1 className={cn(spaceGrotesk.className, "text-xl font-bold")}>
          The Drawing Board
        </h1>
      </div>
    </Link>
  );
}
