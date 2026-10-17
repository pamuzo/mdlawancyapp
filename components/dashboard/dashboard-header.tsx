"use client";

import NotificationInbox from "@/components/notifications/notification-inbox";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardHeader({
  subscriberId,
}: {
  subscriberId: string;
}) {
  const pathname = usePathname();
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <span className="capitalize font-bold">{pathname.slice(1)}</span>
      </div>
      <NotificationInbox subscriberId={subscriberId} />
    </header>
  );
}
