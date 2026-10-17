"use client";
import { enablePushNotifications } from "@/hooks/use-push-notifications";

export function EnablePushButton() {
  return (
    <button onClick={() => enablePushNotifications()}>
      Enable notifications
    </button>
  );
}
