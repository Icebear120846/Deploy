import { useState } from "react";

export default function MyTask() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const addTask = () => {
    const newTask = task.trim();
    if (newTask === "") {
      setError("เห้ยย! ต้องใส่ข้อความก่อนดิ 😡 Bro");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setTask("");
    setError("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedTasks = tasks.filter((item) => item.done).length;
  const remainingTasks = tasks.length - completedTasks;
  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="text-xs font-bold tracking-[0.20em] text-red-500">WEEK 3 • MY TASK</p>
      <div className="mt-4 overflow-hidden rounded-3xl border border-zinc-800 bg-[#11141a]">
        <div className="border-l-4 border-red-500 px-6 py-7 sm:px-8">
          <p className="text-sm font-semibold text-red-400">TODAY'S PLAN</p>
          <h2 className="mt-2 text-3xl font-bold">สิ่งที่ต้องทำวันนี้</h2>
          <p className="mt-2 text-zinc-400">ทำให้เสร็จด้วยล่ะ อย่าขี้เกียจ</p>
        </div>

        <div className="border-t border-zinc-800 px-6 py-6 sm:px-8">
          <div className="flex gap-2">
            <input
              value={task}
              placeholder="เพิ่มงานที่ต้องทำ..."
              onChange={(e) => { setTask(e.target.value); if (error) setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
              className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-[#0c0f14] px-4 py-3 outline-none focus:border-red-500"
            />
            <button onClick={addTask} className="rounded-xl bg-red-500 px-5 py-3 font-bold hover:bg-red-600">เพิ่ม</button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

          <div className="mt-6 space-y-3">
            {tasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-[#0c0f14] px-4 py-10 text-center text-zinc-500">
                ยังไม่มีงาน เพิ่มจากช่องด้านบนได้เลย
              </div>
            ) : tasks.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#0c0f14] px-4 py-3">
                <button onClick={() => toggleTask(item.id)} className="h-8 w-8 rounded-full border border-zinc-600">
                  {item.done ? "✓" : "○"}
                </button>
                <span className={item.done ? "flex-1 text-zinc-500 line-through" : "flex-1 text-zinc-200"}>{item.text}</span>
                <button onClick={() => toggleTask(item.id)} className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">
                  {item.done ? "↩ กลับไปแก้งาน" : "✓ เสร็จแล้ว"}
                </button>
                <button onClick={() => deleteTask(item.id)} className="text-zinc-600 hover:text-red-400">✕</button>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-zinc-800 bg-[#0c0f14] p-4">
            <div className="flex items-end justify-between gap-4">
              <div><p className="text-xs text-zinc-500">PROGRESS</p><p className="mt-1 text-2xl font-bold">{progress}%</p></div>
              <p className="text-right text-sm text-zinc-500">ทั้งหมด {tasks.length} งาน<br />เสร็จแล้ว {completedTasks} • เหลือ {remainingTasks}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full rounded-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
