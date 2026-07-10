import ModeToggle from "@/components/shared/header/mode-toggle";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/forbidden");
  if (user?.role !== "admin") {
    redirect("/forbidden");
  }
  return (
    <div>
      <h1>Settings under construction </h1>
      <ModeToggle />
    </div>
  );
}
