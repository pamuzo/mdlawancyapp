import { EnablePushButton } from "@/components/pushBtn";
import ModeToggle from "@/components/shared/header/mode-toggle";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { sendTestNotification } from "./actions";

export default async function SettingsPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/forbidden");
  // if (user?.role !== "admin") {
  //   redirect("/forbidden");
  // }

  return (
    <div>
      <EnablePushButton />
      <form action={sendTestNotification}>
        <Button type="submit">Send Push Notification</Button>
      </form>

      <h1>Settings under construction </h1>
      <ModeToggle />
    </div>
  );
}
