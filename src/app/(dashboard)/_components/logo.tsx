import Link from "next/link";
import Image from "next/image";
import { business } from "@/constants";

export default function Logo() {
  return (
    <Link href="/">
      <div className="my-4 flex h-[68px] items-center gap-x-2 px-4 transition hover:opacity-75">
        <div className="relative size-20">
          <Image src="/logo.png" alt={`${business.name} logo`} fill />
        </div>
        <h1 className="text-xl font-bold">{business.name}</h1>
      </div>
    </Link>
  );
}
