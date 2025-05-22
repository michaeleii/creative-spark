import Logo from "./logo";
import SidebarNav from "./sidebar-nav";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 hidden w-[300px] shrink-0 flex-col lg:flex">
      <Logo />
      <SidebarNav />
    </aside>
  );
}
