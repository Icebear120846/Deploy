import { Link } from "react-router-dom";

const cards = [
  { to: "/my-task", week: "WEEK 3", title: "My Task", text: "เพิ่มงาน ทำเครื่องหมายเสร็จ ลบงาน และดู Progress", icon: "✓" },
  { to: "/timer", week: "WEEK 4", title: "Study Timer", text: "Focus Timer พร้อมเสียง Start / Pause / Reset และ Test 1s", icon: "⏱" },
  { to: "/about", week: "PROFILE", title: "About Me", text: "ข้อมูลนักศึกษาและสรุปสิ่งที่ใช้ใน Workshop 5", icon: "i" },
];

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-3xl border border-zinc-800 bg-[#11141a] p-7 shadow-2xl shadow-red-950/10 sm:p-9">
        <p className="text-xs font-bold tracking-[0.22em] text-red-500">IG342 • WORKSHOP 5</p>
        <h2 className="mt-3 text-3xl font-black sm:text-5xl">
          ระบบ <span className="text-red-500">นำทาง</span> Dashboard
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.to} to={card.to}
            className="group rounded-3xl border border-zinc-800 bg-[#0d1015] p-6 transition hover:-translate-y-1 hover:border-red-500/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.18em] text-red-500">{card.week}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-xl text-red-400">{card.icon}</span>
            </div>
            <h3 className="mt-6 text-2xl font-black">{card.title}</h3>
            <p className="mt-2 min-h-[72px] text-sm leading-6 text-zinc-500">{card.text}</p>
            <p className="mt-5 text-sm font-bold text-zinc-300 group-hover:text-red-400">เปิดหน้านี้ →</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 px-5 py-4 text-sm text-zinc-500">
        Route ที่ใช้: <span className="text-zinc-300">/</span>, <span className="text-zinc-300">/my-task</span>, <span className="text-zinc-300">/timer</span>, <span className="text-zinc-300">/about</span>
      </div>
    </section>
  );
}
