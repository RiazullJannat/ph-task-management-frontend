import SidebarButtonSvg from "@/components/svgIcon/SidebarButtonSvg";

type SidebarButtonEffectProps = {
  active?: boolean;
  children: React.ReactNode;
};

const SidebarButtonEffect = ({
  active = false,
  children,
}: SidebarButtonEffectProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg group/btn ${
        active ? "opacity-100" : ""
      }`}
    >
      {/* Hover / Active glow */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-200
        ${active ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"}`}
      >
        <SidebarButtonSvg />
      </div>

      {/* Top-left border */}
      <div
        className={`pointer-events-none absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg transition-opacity duration-200
        ${active ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"}`}
      />

      {/* Bottom-right border */}
      <div
        className={`pointer-events-none absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg transition-opacity duration-200
        ${active ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"}`}
      />

      {/* Bottom gradient */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 transition-opacity duration-200
        ${active ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"}`}
      >
        <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SidebarButtonEffect;
