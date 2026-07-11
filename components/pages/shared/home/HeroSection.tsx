"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const mockTasks = [
  { title: "Design system setup", tag: "UI", priority: "High", col: "Done" },
  { title: "API integration", tag: "Backend", priority: "Medium", col: "In Progress" },
  { title: "Write unit tests", tag: "QA", priority: "Low", col: "To Do" },
];

const priorityColor: Record<string, string> = {
  High: "text-red-400 bg-red-500/10",
  Medium: "text-yellow-400 bg-yellow-500/10",
  Low: "text-green-400 bg-green-500/10",
};

const colColor: Record<string, string> = {
  "To Do": "border-t-blue-400",
  "In Progress": "border-t-yellow-400",
  Done: "border-t-green-400",
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030115] pt-24 pb-12 lg:pt-16 lg:pb-0">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8"
            >
              <span className="text-yellow-400">✦</span>
              Now with Image Annotation
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Manage Tasks.{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                Annotate Images.
              </span>{" "}
              Ship Faster.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#9B98AE] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              A unified workspace for Kanban-style task management and
              pixel-perfect image annotation — all persisted to your database.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link href="/login">
                <ButtonComponent
                  buttonName="Get Started"
                  icon={ArrowRight}
                  varient="yellow"
                  clasName="px-6 py-3 text-base"
                />
              </Link>
              <Link href="/tasks">
                <ButtonComponent
                  buttonName="View Tasks"
                  varient="purple"
                  clasName="px-6 py-3 text-base"
                />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start text-sm text-[#9B98AE]"
            >
              {["Drag & Drop Kanban", "Polygon Annotation", "Date-Filtered Tasks"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-green-400" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Kanban Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-3xl" />

              {/* Board mockup */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-white/30 font-mono">taskflow / board</span>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-3 gap-3">
                  {["To Do", "In Progress", "Done"].map((col) => (
                    <div
                      key={col}
                      className={`rounded-xl border-t-2 ${colColor[col]} bg-white/[0.03] border border-white/5 p-3 space-y-2`}
                    >
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                        {col}
                      </p>
                      {mockTasks
                        .filter((t) => t.col === col)
                        .map((task) => (
                          <div
                            key={task.title}
                            className="rounded-lg bg-white/[0.05] border border-white/10 p-2.5 space-y-2"
                          >
                            <p className="text-xs text-white/80 font-medium leading-snug">
                              {task.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/40">
                                {task.tag}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColor[task.priority]}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>

                {/* Date pill */}
                <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs text-yellow-400/80 font-mono">
                    {new Date().toDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
