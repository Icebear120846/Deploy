import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "⌂" },
  { to: "/my-task", label: "My Task", icon: "✓" },
  { to: "/timer", label: "Study Timer", icon: "⏱" },
  { to: "/about", label: "About", icon: "i" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-zinc-800 bg-[#0b0e13]/95 p-5 md:flex md:flex-col">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.22em] text-red-500">IG342 • นายธัญพิสิษฐ์ ใจเสมอ</p>
        <h1 className="mt-2 text-xl font-black">ROUTE HUB</h1>
        <p className="mt-1 text-xs text-zinc-50">66110619</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 font-bold text-red-300"
                : "flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-zinc-400 transition hover:border-zinc-800 hover:bg-zinc-900 hover:text-white"
            }
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-sm">
              {link.icon}
            </span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-zinc-800 bg-[#11141a] p-4 text-xs leading-5 text-zinc-500">
        <span className="text-red-500">มาขยันกันเถอะ!</span><br />
        Workshop 5
      </div>
    </aside>
  );
}
