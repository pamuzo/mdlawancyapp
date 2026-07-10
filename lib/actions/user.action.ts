"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { getSession } from "../get-session";
import { profileSchema } from "../validator";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { formDataToObject } from "../utils";

// Action to register a new user
export async function signUpUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackURL = (formData.get("callbackUrl") as string) || "/";
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Account created successfully",
      data,
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: error?.body?.message || error?.message || "Something went wrong",
    };
  }
}

export async function signInUserWithGoogle(provider: "google") {
  try {
    const response = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: "/",
      },
      headers: await headers(),
    });

    if (response?.url) {
      redirect(response.url);
      return { ok: true };
    }

    return { ok: false };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { ok: false };
  }
}

// Action to sign in a new user
export async function signInUser(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackURL = (formData.get("callbackUrl") as string) || "/";

    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
        callbackURL,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "Invalid credentials",
    };
  }
}

// Action to sign out user
export async function signOutUser() {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
}

// Action to send email verification link
export async function sendVerificationEmail(formData: FormData) {
  try {
    const callbackURL =
      (formData.get("callbackUrl") as string) || "/email-verified";
    const email = formData.get("email") as string;

    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "Something went wrong",
    };
  }
}

// Action to send password reset email
export async function PasswordResetRequest(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const callbackURL =
      (formData.get("callbackUrl") as string) || "/reset-password";

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: callbackURL,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message:
        "If an account exists for this email, we've sent a password reset link.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "Something went wrong",
    };
  }
}

// Action to reset password
export async function resetPassword(formData: FormData) {
  try {
    const newPassword = formData.get("newPassword") as string;
    const token = formData.get("token") as string;

    console.log({ newPassword, token });
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "Something went wrong",
    };
  } finally {
    // Clear the token from the URL after processing
    // This is a client-side operation, so we can use window.history
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());
    }
  }
}

// Action to updater user
export async function updateProfile(formData: FormData) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const values = profileSchema.parse(formDataToObject(formData));
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...values,
        dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth) : null,
      },
    });

    redirect("/profile");

    // return {
    //   success: true,
    //   message: "Updated Successfully",
    // };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
