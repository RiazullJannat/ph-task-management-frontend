/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSidebar } from "@/components/pages/shared/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/pages/shared/dashboard/navbar";
import StoreProvider from "@/provider/StoreProvider";

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
  title: "Optilux CRM",
  description: "This is the dashboard",
};

// Root layout component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div
      className={`
        ${geistSans.variable} ${geistMono.variable} 
        antialiased 
        relative 
        min-h-screen 
        bg-[linear-gradient(40deg,hsl(0_0%_0%)_2%,hsl(285_65%_8%)_34%,hsl(278_72%_13%)_46%,hsl(278_72%_13%)_57%,hsl(285_65%_8%)_69%,hsl(0_0%_0%)_99%)]
        text-white`}
    >
      {/* Layout Structure */}
      <div className="max-w-360 mx-auto relative text-white">
        <SidebarProvider className="px-1 gap-1" defaultOpen={true}>
          <AppSidebar />
          <SidebarInset className="max-w-[1200px] mx-auto space-y-0">
            <Navbar />
            <div className=" w-full mx-auto px-1 py-1 overflow-hidden ">
              <StoreProvider>{children}</StoreProvider>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
