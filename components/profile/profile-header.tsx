import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

export function ProfileHeader({ user }: Props) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900">
      <div className="h-56 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500" />

      <div className="relative px-8 pb-8">
        <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end">
          <img
            src={
              user.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name,
              )}`
            }
            alt={user.name}
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-slate-500">{user.email}</p>
          </div>

          <Link href={`/profile/${user.id}`}>
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
