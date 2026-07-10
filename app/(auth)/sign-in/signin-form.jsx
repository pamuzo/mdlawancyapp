"use client";

import React, { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirect, useSearchParams } from "next/navigation";
import { signInUser } from "@/lib/actions/user.action";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_NAME } from "@/lib/constants";

/* ---------------- Submit Button ---------------- */

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
}

export default function SigninForm() {
  const [data, action] = useActionState(signInUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (data?.success) {
      toast.success("Signed in successfully!");
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
        style={{ backgroundImage: "url('/images/mug.png')" }}
      />

      {/* Right side - Gradient and Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-1 flex-col  items-center px-6 py-14 "
      >
        <div className="w-full max-w-md space-y-6  ">
          <CardHeader className="space-y-6">
            <Link href="/" className="flex justify-center">
              <Image
                src="images/logo.svg"
                alt={`${APP_NAME} Logo`}
                width={100}
                height={100}
              />
            </Link>
            <CardTitle className="text-center  ">Sign In</CardTitle>
            <CardDescription className="text-center">
              Welcome back! Please sign in to continue to your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form action={action} className="space-y-6">
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
              <div className="space-y-6">
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    //   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <Label className="flex items-center space-x-2">
                    <input type="checkbox" className="accent-white" />
                    <span>Remember me</span>
                  </Label>
                  <Link href="/forgot-password" className="hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <SignInButton />
                </div>
                {data && !data.success && (
                  <div className="text-center text-destructive">
                    {data.message}
                  </div>
                )}
                <div className="text-sm text-center text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    target="_self"
                    className="link font-semibold underline"
                  >
                    Sign up
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
