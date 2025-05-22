import UserButton from "@/components/user-button";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-8">
      <Logo />
      <div className="flex gap-2">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
