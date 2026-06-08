/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { useUser } from "@/provider/AuthProvider";
import { logout } from "@/service/authService";

import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import NavbarSearch from "./NavbarSearch";

const Navbar: React.FC = () => {
  const { state } = useSidebar();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { setUser, user, setIsLoading } = useUser();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const name = profile?.name || user?.tenantSlug || "User";
  const trimedName = name.length > 15 ? name.slice(0, 15) + "..." : name;
  const avatarUrl = profile?.avatar_secure_url || "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687";
  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res.success) {
        setIsLoading(true);
        setUser(null);
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/login");
      } else {
        toast.error(res.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 flex h-14 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 rounded-b-xl ${
        scrolled
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {state === "collapsed" && <SidebarTrigger />}
      <div className={`w-full flex items-center justify-between gap-2 px-1}`}>
        <div className="w-full flex items-center justify-between gap-2">
          <div className="pl-2">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="cursor-pointer"
            >
              <ArrowLeft />
            </Button>
          </div>
          <div className="flex-1 flex justify-center max-w-md">
            <NavbarSearch />
          </div>
          <div className="flex items-center gap-4">

            <Popover>
              <PopoverTrigger asChild className="bg-transparent">
                <button className="flex items-center gap-4 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 cursor-pointer p-2 rounded-lg ">
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage src={avatarUrl} />
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <p className="text-sm font-semibold text-foreground">
                      <TooltipComponent name={name} trimedName={trimedName} />
                    </p>
                    <span className="text-xs text-muted-foreground/70">
                      {user?.role}
                    </span>
                  </div>
                  <span>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 bg-white/5 backdrop-blur-2xl"
                align="end"
              >
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatarUrl} />
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">
                      <TooltipComponent name={name} trimedName={trimedName} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role}
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-white/10 hover:text-accent-foreground transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings/notification-settings"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-white/10 hover:text-accent-foreground transition-colors"
                >
                  My Settings
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-white/10 hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
