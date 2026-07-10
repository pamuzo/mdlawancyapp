"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/googleIcon";
import { PasswordInput } from "@/components/password-input";

import { toast } from "sonner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_NAME } from "@/lib/constants";
import { signUpUser } from "@/lib/actions/user.action";

/* ---------------- Submit Button ---------------- */

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Sign up"}
    </Button>
  );
}

export default function SignUpForm() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const handleSocialSignIn = async (provider) => {
    try {
      await signInUserWithGoogle({ provider });

      // if (!result.ok) {
      //   toast.error("Failed to sign up with Google");
      //   return;
      // }

      // const { url } = await result.json();
      // window.location.href = url;
    } catch (err) {
      toast.error("Failed to sign up with Google");
    }
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (data?.success) {
      toast.success("Sign up successfully!");
      redirect("/");
    }

    if (data?.success === false && data?.message) {
      toast.error(data.message);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row  ">
      {/* Left side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/stone.png')" }}
      />

      {/* Right side - Gradient and Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-1 flex-col  items-center px-6 py-14 "
      >
        <div className="w-full max-w-md space-y-6  ">
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center">
              <Image
                src="/images/logo.svg"
                alt={`${APP_NAME} Logo`}
                width={100}
                height={100}
              />
            </Link>
            <CardTitle className="text-center  ">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Join MD Lawancy today — it only takes a minute!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <form action={action} className="space-y-5">
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium ">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium ">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    Password
                  </Label>
                  <PasswordInput
                    id="password"
                    name="password"
                    autoComplete="password"
                    required
                    //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium "
                  >
                    Confirm Password
                  </Label>
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="password"
                    required
                    //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Terms Checkbox */}
                <div className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className=""
                  />
                  <Label htmlFor="terms" className="text-xs">
                    I agree to the{" "}
                    <a href="#" className="underline font-medium">
                      Terms & Conditions
                    </a>
                  </Label>
                </div>

                <div>
                  <SignUpButton />
                </div>
                {data && !data.success && (
                  <div className="text-center text-destructive">
                    {data.message}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  // disabled={useFormStatus().pending}
                  onclick={() => {
                    handleSocialSignIn("google");
                  }}
                >
                  <GoogleIcon className="mr-2" />
                  Sign up with Google
                </Button>

                <div className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    target="_self"
                    className="link font-semibold underline"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </motion.div>
    </div>
  );
}
