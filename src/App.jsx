import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import MyTask from "./pages/MyTask";
import StudyTimer from "./pages/StudyTimer";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_35%),#08090c] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-task" element={<MyTask />} />
            <Route path="/timer" element={<StudyTimer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
