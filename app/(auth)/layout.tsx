import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AuthEllipsSVG from "@/components/svgIcon/AuthEllipsSVG";

// Load custom fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for Next.js
export const metadata: Metadata = {
  title: "TaskFlow",
  description: "This is the auth layout of TaskFlow",
};

// Root layout component
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen bg-[#030115] overflow-hidden flex items-center justify-center`}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-purple-700/15 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-yellow-500/8 blur-[120px]" />
      </div>
      <AuthEllipsSVG />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
