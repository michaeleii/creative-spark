import Link from "next/link";
import { Palette } from "lucide-react";

export function Logo() {
  return (
    <Link href="/">
      {/* <div className="relative size-8 shrink-0">
        <Image
          src="/logo.svg"
          alt="TheDrawingBoard Logo"
          fill
          className="shrink-0 transition hover:opacity-75"
        />
      </div> */}
      <div className="ml-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-2 text-background">
        <Palette className="shrink-0" />
      </div>
    </Link>
  );
}
