"use client";

import { Inbox } from "@novu/nextjs";

const fallbackSubscriberId = "6ac951b4d28c7439a76bceb1";

export default function NotificationInbox({
  subscriberId = fallbackSubscriberId,
}: {
  subscriberId?: string;
}) {
  const applicationIdentifier =
    process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER;
  const backendUrl = process.env.NEXT_PUBLIC_NOVU_BACKEND_URL;
  const socketUrl = process.env.NEXT_PUBLIC_NOVU_SOCKET_URL;

  if (!applicationIdentifier) return null;

  return (
    <Inbox
      applicationIdentifier={applicationIdentifier}
      subscriberId={subscriberId}
      {...(backendUrl ? { backendUrl } : {})}
      {...(socketUrl ? { socketUrl } : {})}
      appearance={{
        variables: {
          colorBackground: "var(--popover)",
          colorForeground: "var(--popover-foreground)",
          colorPrimary: "var(--primary)",
          colorPrimaryForeground: "var(--primary-foreground)",
          colorSecondary: "var(--secondary)",
          colorSecondaryForeground: "var(--secondary-foreground)",
          colorCounter: "var(--destructive)",
          colorCounterForeground: "var(--primary-foreground)",
          colorNeutral: "var(--border)",
          colorRing: "var(--ring)",
          fontSize: "0.875rem",
          borderRadius: "var(--radius)",
        },
        elements: {
          bellIcon: {
            color: "var(--foreground)",
          },
        },
      }}
    />
  );
}
