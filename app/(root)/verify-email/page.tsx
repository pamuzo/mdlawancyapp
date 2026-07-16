import { getSession } from "@/lib/get-session";
import { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import { ResendVerificationButton } from "./resend-verification-btn";
import AdsterraBanner from "@/adsterra/adsterra";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.emailVerified) redirect("/profile");

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-30 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Verify your email for MDLAWANCY LIMITED
          </h1>
          <p className="text-muted-foreground">
            A verification email will be sent to your inbox.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
      <AdsterraBanner />
    </main>
  );
}
