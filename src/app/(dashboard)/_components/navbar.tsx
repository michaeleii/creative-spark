import UserButton from "@/components/user-button";
import Logo from "./logo";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-8">
      <Logo />
      <UserButton />
    </nav>
  );
}
