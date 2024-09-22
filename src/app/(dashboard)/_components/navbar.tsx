import UserButton from "@/components/user-button";

export default function Navbar() {
  return (
    <nav className="flex h-[68px] w-full items-center p-4">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
}
