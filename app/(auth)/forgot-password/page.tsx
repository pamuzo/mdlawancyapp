import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="space-y-6 w-full">
        <div className="space-y-2 text-center">
          <Link href="/" className="flex justify-center">
            <Image
              src="images/logo.svg"
              alt={`${APP_NAME} Logo`}
              width={100}
              height={100}
            />
          </Link>
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
