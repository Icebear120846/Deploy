import { useEffect, useRef, useState } from "react";

const timerModes = [
  { name: "Test 1s", seconds: 1, description: "โหมดทดสอบ 1 วินาทีสำหรับเช็กเสียงและระบบหมดเวลา" },
  { name: "Quick", minutes: 15, description: "อ่านหรือทำงานสั้น ๆ ให้เสร็จแบบไม่หลุดโฟกัส" },
  { name: "Focus", minutes: 25, description: "โหมดมาตรฐานสำหรับตั้งใจเรียนหรือทำงานหนึ่งช่วง" },
  { name: "Deep Focus", minutes: 30, description: "โหมดโฟกัสยาวขึ้นสำหรับงานที่ต้องใช้สมาธิ" },
  { name: "Short Break", minutes: 5, description: "พักสายตา ลุกเดิน และรีเซ็ตสมองสั้น ๆ" },
  { name: "Long Break", minutes: 15, description: "พักยาวก่อนกลับมาเริ่มรอบใหม่" },
];

export default function StudyTimer() {
  const [selectedMode, setSelectedMode] = useState(timerModes[1]);
  const getModeSeconds = (mode) => mode.seconds ?? mode.minutes * 60;
  const [timeLeft, setTimeLeft] = useState(getModeSeconds(timerModes[1]));
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const runningAudioRef = useRef(null);
  const finishAudioRef = useRef(null);

  const totalSeconds = getModeSeconds(selectedMode);
  const publicAsset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      setIsFinished(true);
      if (runningAudioRef.current) {
        runningAudioRef.current.pause();
        runningAudioRef.current.currentTime = 0;
      }
      if (finishAudioRef.current) {
        finishAudioRef.current.currentTime = 0;
        finishAudioRef.current.play().catch(() => {});
      }
      alert("TIME'S UP! หมดเวลาแล้วครับ พักได้เลย");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => currentTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const selectMode = (mode) => {
    if (isRunning || timeLeft !== totalSeconds) return;
    setSelectedMode(mode);
    setTimeLeft(getModeSeconds(mode));
    setIsFinished(false);
  };

  const startTimer = () => {
    if (timeLeft <= 0) return;
    setIsFinished(false);
    if (finishAudioRef.current) {
      finishAudioRef.current.pause();
      finishAudioRef.current.currentTime = 0;
    }
    if (runningAudioRef.current) {
      runningAudioRef.current.volume = 0.28;
      runningAudioRef.current.play().catch(() => {});
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (runningAudioRef.current) runningAudioRef.current.pause();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    if (runningAudioRef.current) {
      runningAudioRef.current.pause();
      runningAudioRef.current.currentTime = 0;
    }
    if (finishAudioRef.current) {
      finishAudioRef.current.pause();
      finishAudioRef.current.currentTime = 0;
    }
    setTimeLeft(getModeSeconds(selectedMode));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const progress = totalSeconds === 0
    ? 0
    : Math.max(0, Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  return (
    <main className={isFinished
      ? "min-h-screen bg-red-950 px-4 py-8 text-white transition-colors duration-500"
      : "min-h-screen bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_36%),#08090c] px-4 py-8 text-white transition-colors duration-500"}>
      <div className="mx-auto w-full max-w-3xl">
        <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#11141a] shadow-2xl shadow-red-950/20">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex items-center justify-center border-b border-zinc-800 bg-[#0c0f14] p-5 md:border-b-0 md:border-r">
              <img src={publicAsset("study-timer-mascot.png")} alt="Study Timer Mascot" className="max-h-[360px] w-full object-contain" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.22em] text-red-500">WEEK 4 • STUDY TIMER</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                อย่าขี้เกียจ <span className="text-red-500">Study Timer</span> 😂
              </h1>
              <p className="mt-2 text-zinc-400">ทำให้เสร็จด้วยล่ะ อย่าขี้เกียจ</p>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {timerModes.map((mode) => {
                  const active = selectedMode.name === mode.name;
                  return (
                    <button
                      key={mode.name}
                      onClick={() => selectMode(mode)}
                      disabled={isRunning || timeLeft !== totalSeconds}
                      className={active
                        ? "rounded-xl border border-red-500 bg-red-500/15 px-3 py-3 text-left text-sm font-bold text-red-300"
                        : "rounded-xl border border-zinc-800 bg-[#0b0e13] px-3 py-3 text-left text-sm text-zinc-300 transition hover:border-red-500/40 disabled:cursor-not-allowed disabled:opacity-40"}>
                      <span className="block">{mode.name}</span>
                      <span className="mt-1 block text-xs font-normal text-zinc-500">{mode.seconds ? `${mode.seconds} sec` : `${mode.minutes} min`}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#0b0e13] p-5 text-center">
                <p className="text-sm font-bold text-red-400">{selectedMode.name}</p>
                <p className="mt-1 min-h-[40px] text-sm leading-5 text-zinc-500">{selectedMode.description}</p>
                <div className="my-4 text-6xl font-black tabular-nums tracking-tight sm:text-7xl">{formatTime(timeLeft)}</div>
                {isFinished && <p className="mb-3 animate-pulse font-black tracking-widest text-red-400">TIME'S UP! พักได้เลย</p>}

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-zinc-600">
                  <span>{Math.round(progress)}%</span>
                  <span>{selectedMode.seconds ? `${selectedMode.seconds} วินาที` : `${selectedMode.minutes} นาที`}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button onClick={startTimer} disabled={isRunning || timeLeft <= 0}
                  className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40">START</button>
                <button onClick={pauseTimer} disabled={!isRunning}
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 font-bold text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40">PAUSE</button>
                <button onClick={resetTimer}
                  className="rounded-xl border border-zinc-700 bg-transparent px-4 py-3 font-bold text-zinc-300 transition hover:border-red-500 hover:text-red-400">RESET</button>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-600">ถ้าต้องการเปลี่ยน Mode ให้กด RESET ก่อน</p>
            </div>
          </div>
        </section>

        <footer className="mt-5 text-center text-xs leading-6 text-zinc-600">
          IG342 • 66110619<br />นายธัญพิสิษฐ์ ใจเสมอ
        </footer>

        <audio ref={runningAudioRef} src={publicAsset("ระหว่างเวลาเดิน.mp3")} loop preload="auto" />
        <audio ref={finishAudioRef} src={publicAsset("เวลาหมด.mp3")} preload="auto" />
      </div>
    </main>
  );
}
