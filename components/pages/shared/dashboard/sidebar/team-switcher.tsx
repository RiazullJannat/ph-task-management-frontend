"use client";

import * as React from "react";
import Image from "next/image";
import Optilux from "../../../../../public/images/OptiluxBD.png";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import TooltipComponent from "@/components/ui/TooltipComponent";

// Named components — display name lint error হবে না
function RemoteLogo({ url }: { url: string }) {
  return (
    <Image
      src={url}
      alt="Company Logo"
      width={32}
      height={32}
      className="object-contain w-full h-full"
      unoptimized
    />
  );
}

function DefaultLogo() {
  return (
    <Image
      src={Optilux}
      alt="Logo"
      width={32}
      height={32}
      className="object-contain w-full h-full"
    />
  );
}

export function TeamSwitcher({
  name,
  plan,
  logoUrl,
}: {
  name: string;
  plan: string;
  logoUrl?: string | null;
}) {
  const { state } = useSidebar();
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <div 
                className="flex aspect-square size-10 items-center justify-center rounded-lg overflow-hidden p-0.5"
                style={{ background: 'linear-gradient(to bottom right, #FFFFFF 2%, #FFB13F, #FFCB7F, #d4b012ff)' }}
              >
                {logoUrl ? <RemoteLogo url={logoUrl} /> : <DefaultLogo />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium"> <TooltipComponent name={name} trimedName={trimedName} /></span>
                <span className="truncate text-xs">{plan}</span>
              </div>
            </div>
          </Link>
          {state === "expanded" && <SidebarTrigger />}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
