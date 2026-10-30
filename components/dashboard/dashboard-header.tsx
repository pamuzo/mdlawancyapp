"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  return (
    <header className="flex h-16 min-w-0 items-center justify-between border-b px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <SidebarTrigger />
        <span className="truncate font-bold capitalize">{pathname.slice(1)}</span>
      </div>
    </header>
  );
}
