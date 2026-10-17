"use server";

import { getSession } from "@/lib/get-session";
import { sendPushToUser } from "@/lib/push";
import { redirect } from "next/navigation";

export async function sendTestNotification() {
  const session = await getSession();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/forbidden");
  }

  await sendPushToUser(session.user.id, {
    body: "It works",
    url: "/",
  });

  console.log("Push notification sent successfully");
}
