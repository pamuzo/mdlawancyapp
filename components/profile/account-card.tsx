import { Badge, ShieldIcon } from "lucide-react";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    businessName: string;
    bio: string;
    businessAddress: string;
    role: string;
    phoneNumber: string;
  };
};

export function AccountCard({ user }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">Account Information</h2>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-slate-500">Full Name</label>

          <div className="mt-2 rounded-xl border p-3">{user.name}</div>
        </div>

        <div>
          <label className="text-sm text-slate-500">Email Address</label>

          <div className="mt-2 rounded-xl border p-3">{user.email}</div>
        </div>

        <div>
          <label className="text-sm text-slate-500">Phone Number</label>

          <div className="mt-2 break-all rounded-xl border p-3">
            {user.phoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
export function OtherAccount({ user }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">Account Information</h2>

      <div className="space-y-6">
        <div>
          <label className="text-sm text-slate-500">Business Name</label>

          <div className="mt-2 rounded-xl border p-3">{user.businessName}</div>
        </div>

        <div>
          <label className="text-sm text-slate-500">Business Address</label>

          <div className="mt-2 rounded-xl border p-3">
            {user.businessAddress}
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-500">Bio</label>

          <div className="mt-2 break-all rounded-xl border p-3">{user.bio}</div>
        </div>
      </div>
    </div>
  );
}
