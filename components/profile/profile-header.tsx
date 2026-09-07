"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import moment from "moment";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

export function ProfileHeader({ user }: Props) {
  const currentDate = new Date();
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
    >
      <div>
        <p className="mb-1 text-sm font-medium text-green-600">
          {moment(currentDate).format("MMMM Do YYYY, ")}
        </p>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Thank you for being a valued customer.
        </p>
      </div>

      <div className="flex gap-2">
        <Link href={`/profile/${user.id}`}>
          <Button>
            {/* <Plus className="mr-2 h-4 w-4" /> */}
            Update Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
