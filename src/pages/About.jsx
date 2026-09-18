export default function About() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-zinc-800 bg-[#11141a] p-7 shadow-2xl shadow-red-950/10 sm:p-9">
        <p className="text-xs font-bold tracking-[0.22em] text-red-500">ABOUT • STUDENT</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">นายธัญพิสิษฐ์ ใจเสมอ</h2>
        <p className="mt-2 text-zinc-500">รหัสนักศึกษา 66110619</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-[#0b0e13] p-5">
            <p className="text-xs font-bold text-red-400">COURSE</p>
            <p className="mt-2 font-bold">IG342</p>
            <p className="mt-1 text-sm leading-6 text-zinc-500">การพัฒนาแอปพลิเคชันบนอุปกรณ์เคลื่อนที่ 1</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#0b0e13] p-5">
            <p className="text-xs font-bold text-red-400">WORKSHOP 5-1</p>
            <p className="mt-2 font-bold">React Route</p>
            <p className="mt-1 text-sm leading-6 text-zinc-500">แยกหน้าและเชื่อมแต่ละ Week ด้วย Path และ Route</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-800 bg-[#0b0e13] p-5">
          <p className="font-bold">สิ่งที่ใช้ในงานนี้</p>
          <p className="mt-2 text-sm leading-7 text-zinc-500">HashRouter • Routes • Route • NavLink • useState • useEffect • useRef • Tailwind CSS</p>
        </div>
      </div>
    </section>
  );
}
