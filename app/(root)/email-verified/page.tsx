import AdsterraBanner from "@/adsterra/adsterra";
import { Button } from "@/components/ui/button";
import { prisma } from "@/db/prisma";
import { getSession } from "@/lib/get-session";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verified",
};

export default async function EmailVerifiedPage() {
  const session = await getSession();
  const userId = session?.user?.id;
  const amount = 500;

  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        cashBack: {
          increment: amount,
        },
      },
    });
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Email verified</h1>
          <p className="text-muted-foreground">
            Your email has been verified successfully.
          </p>
        </div>
        <Button>
          <Link href="/profile">Go to profile</Link>
        </Button>
      </div>
      <AdsterraBanner />
    </main>
  );
}
