import Link from "next/link";
import Image from "next/image";
import { business } from "@/constants";
export function Logo() {
  return (
    <Link href="/">
      <div className="relative size-20 shrink-0">
        <Image
          src="/logo.png"
          alt={`${business.name} Logo`}
          fill
          className="shrink-0 transition hover:opacity-75"
        />
      </div>
    </Link>
  );
}
