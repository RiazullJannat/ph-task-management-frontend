import { CalendarDays, Layers, Pencil, ShieldCheck } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Layers, color: "text-yellow-400 bg-yellow-400/10", label: "Kanban Board", desc: "Drag & drop tasks by date" },
  { icon: Pencil, color: "text-purple-400 bg-purple-400/10", label: "Image Annotation", desc: "Draw polygons, save to DB" },
  { icon: CalendarDays, color: "text-blue-400 bg-blue-400/10", label: "Date-Driven Tasks", desc: "Filter tasks per day" },
  { icon: ShieldCheck, color: "text-green-400 bg-green-400/10", label: "Secure Auth", desc: "JWT-based session management" },
];

const LoginText = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-10 max-w-md px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
          <div className="w-4 h-4 border-[3px] border-[#030115] rotate-45" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">TaskFlow</span>
      </Link>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold leading-tight text-white">
          Manage Tasks.{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Annotate Images.
          </span>
        </h1>
        <p className="text-[#9B98AE] text-base leading-relaxed">
          A unified workspace for Kanban-style task management and pixel-perfect
          image annotation — all persisted to your database.
        </p>
      </div>

      {/* Feature list */}
      <div className="grid grid-cols-2 gap-3">
        {features.map(({ icon: Icon, color, label, desc }) => (
          <div
            key={label}
            className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.07] bg-white/[0.03]"
          >
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0`}>
              <Icon size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-[#9B98AE]">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom quote */}
      <p className="text-xs text-white/20 border-t border-white/5 pt-6">
        Believe in the code that believes in you. 🔥
      </p>
    </div>
  );
};

export default LoginText;
