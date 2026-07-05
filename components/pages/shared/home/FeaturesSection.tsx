"use client";

import { motion } from "framer-motion";
import { CalendarDays, Layers, Pencil } from "lucide-react";

const features = [
  {
    icon: Layers,
    color: "text-yellow-400",
    glow: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    title: "Kanban Board",
    description:
      "Drag and drop tasks across To Do, In Progress, and Done columns. Filter by date with a shared date picker that syncs across the entire board.",
  },
  {
    icon: Pencil,
    color: "text-purple-400",
    glow: "bg-purple-400/10",
    border: "border-purple-400/20",
    title: "Image Annotation",
    description:
      "Upload images, draw precise polygons, and save annotations to the database. Scroll through multiple images and manage shapes per image.",
  },
  {
    icon: CalendarDays,
    color: "text-blue-400",
    glow: "bg-blue-400/10",
    border: "border-blue-400/20",
    title: "Date-Driven Tasks",
    description:
      "Every task is tied to a date. Select any day to view, add, or edit tasks for that specific day — keeping your workflow organized and focused.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#030115] relative overflow-hidden">
      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[4px] text-yellow-400 text-center mb-4"
        >
          Features
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          Everything you need to stay in flow
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#9B98AE] text-center max-w-xl mx-auto mb-16"
        >
          Two powerful tools in one clean interface — built for developers who
          care about both productivity and precision.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${f.glow} border ${f.border} flex items-center justify-center mb-5`}
              >
                <f.icon size={22} className={f.color} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-[#9B98AE] leading-relaxed">{f.description}</p>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
