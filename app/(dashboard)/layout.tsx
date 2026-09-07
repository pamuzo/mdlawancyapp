import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/get-session";
import UserSidebar from "@/components/user_dashbord/userSidebar";
import DashboardTrigger from "@/components/user_dashbord/dashboardtrigger";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/sign-in");

  return (
    <SidebarProvider>
      <UserSidebar session={session} />
      <SidebarInset>
        <DashboardTrigger />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
