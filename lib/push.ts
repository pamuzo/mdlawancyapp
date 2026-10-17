import { messaging } from "@/lib/firebase-admin";
import { prisma } from "@/db/prisma";

export async function sendPushToUser(
  userId: string,
  { body, url = "/" }: { body: string; url?: string },
) {
  const rows = await prisma.pushToken.findMany({ where: { userId } });
  if (!rows.length) return;

  const res = await messaging.sendEachForMulticast({
    tokens: rows.map((r) => r.token),
    notification: { title: "MD Lawancy", body },
    webpush: {
      notification: {
        icon: "/images/icons/icon-192.png",
        badge: "/images/icons/icon-192.png",
      },
      fcmOptions: { link: url },
    },
  });

  const dead = res.responses
    .map((r, i) => ({ r, token: rows[i].token }))
    .filter(
      ({ r }) =>
        !r.success &&
        [
          "messaging/registration-token-not-registered",
          "messaging/invalid-registration-token",
        ].includes(r.error?.code ?? ""),
    )
    .map(({ token }) => token);

  if (dead.length)
    await prisma.pushToken.deleteMany({ where: { token: { in: dead } } });
}
