"use client";

import { motion } from "framer-motion";
import { KeyRound, Layers, Pencil } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: KeyRound,
    color: "text-yellow-400",
    glow: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    title: "Login to your workspace",
    description:
      "Sign in with your email and password. Your session is secured with JWT tokens and persisted across page reloads.",
  },
  {
    number: "02",
    icon: Layers,
    color: "text-purple-400",
    glow: "bg-purple-400/10",
    border: "border-purple-400/20",
    title: "Manage tasks on the board",
    description:
      "Pick a date, create tasks with titles, priorities, and tags. Drag them between columns as work progresses.",
  },
  {
    number: "03",
    icon: Pencil,
    color: "text-blue-400",
    glow: "bg-blue-400/10",
    border: "border-blue-400/20",
    title: "Annotate your images",
    description:
      "Upload images, draw polygon annotations directly on the canvas, and save them to the database for later review.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#0d0a1f] relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-800/10 blur-[120px] rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[4px] text-purple-400 text-center mb-4"
        >
          How It Works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          Three steps to productivity
        </motion.h2>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-yellow-400/30 via-purple-400/30 to-blue-400/30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div
                  className={`relative w-20 h-20 rounded-2xl ${step.glow} border ${step.border} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <step.icon size={28} className={step.color} />
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0d0a1f] border border-white/10 text-[10px] font-bold text-white/50 flex items-center justify-center">
                    {step.number.slice(1)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-[#9B98AE] leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
