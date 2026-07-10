"use client";

import { LoadingButton } from "@/components/loading-btn";
import { sendVerificationEmail } from "@/lib/actions/user.action";
import { useState } from "react";
import { toast } from "sonner";

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resendVerificationEmail() {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      const result = await sendVerificationEmail(formData);

      if (result.success) {
        const msg = result.message || "Verification email sent successfully";
        setSuccess(msg);
        toast.success(msg);

        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      } else {
        const msg = result.message || "Something went wrong";

        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {success && (
        <div role="status" className="text-sm text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <LoadingButton
        onClick={resendVerificationEmail}
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        Resend verification email
      </LoadingButton>
    </div>
  );
}
