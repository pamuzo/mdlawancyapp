import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { AccountCard, OtherAccount } from "@/components/profile/account-card";
import {
  RecentActivities,
  SecurityCard,
} from "@/components/profile/security-card";
import { getSession } from "@/lib/get-session";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;
  // Ensure numeric monetary fields are passed as strings to match ProfileStats prop types
  const statsUser = {
    ...user,
    cashBack: String((user as any).cashBack ?? "0"),
    totalCredit: String((user as any).totalCredit ?? "0"),
    totalDebits: String((user as any).totalDebits ?? "0"),
    totalSpent: String((user as any).totalSpent ?? "0"),
    totalJobs: String((user as any).totalJobs ?? "0"),
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <ProfileHeader user={user} />

        <div className="mt-8">
          <ProfileStats user={statsUser} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AccountCard user={user} />
          <SecurityCard user={user} />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <OtherAccount user={user} />
          <RecentActivities user={user} />
        </div>
      </div>
    </main>
  );
}
