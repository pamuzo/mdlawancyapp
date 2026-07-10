"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  return (
    <header className="flex h-16 items-center   border-b px-4">
      <SidebarTrigger />
      <span className="capitalize font-bold">{pathname.slice(1)}</span>
    </header>
  );
}
