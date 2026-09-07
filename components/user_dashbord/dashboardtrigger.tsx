import { SidebarTrigger } from "@/components/ui/sidebar";

import { Search, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserSidebar from "@/components/user_dashbord/userSidebar";
import { getSession } from "@/lib/get-session";

export default async function DashboardTrigger() {
  const session = await getSession();
  return (
    <>
      {/* Dashboard Header */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border  px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className=" hover:bg-green-50" />

          <div className="hidden h-6 w-px bg-slate-200 sm:block" />

          <div>
            <h1 className="text-sm font-semibold">Dashboard</h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Manage your account, view your orders, and update your profile
              information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border hover:bg-green-50"
          >
            <Search className="size-4 " />
          </Button>

          {/* Notifications */}

          <Button
            variant="outline"
            size="icon"
            className="relative rounded-xl border hover:bg-green-50"
          >
            <Bell className="size-4 text-gray-500" />

            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
          </Button>
        </div>
      </header>

      <UserSidebar session={session} />
    </>
  );
}
