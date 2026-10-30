import { AppSidebar } from "@/components/dashboard/app-sidebar ";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  const user = session?.user;

  if (!user) redirect("/forbidden");
  if (user.role !== "admin") {
    redirect("/forbidden");
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />

      <SidebarInset>
        <DashboardHeader />

        <main className="min-w-0 p-3 sm:p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
