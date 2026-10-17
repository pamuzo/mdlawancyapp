"use client";

import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { useEffect } from "react";
import { firebaseApp } from "@/lib/firebase-client";

export async function enablePushNotifications() {
  if (!(await isSupported()))
    throw new Error("Push not supported in this browser");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
  );
  await navigator.serviceWorker.ready;

  const token = await getToken(getMessaging(firebaseApp), {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  await fetch("/api/push/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return token;
}

// Foreground messages (the SW only handles background)
export function useForegroundMessages() {
  useEffect(() => {
    let unsub: (() => void) | undefined;
    isSupported().then((ok) => {
      if (!ok) return;
      unsub = onMessage(getMessaging(firebaseApp), (payload) => {
        new Notification("mdlawancy", {
          body: payload.notification?.body ?? "You have a new notification",
          icon: "/images/icons/icon-192.png",
          badge: "/images/icons/icon-192.png",
        });
      });
    });
    return () => unsub?.();
  }, []);
}
