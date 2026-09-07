import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { updateProfile } from "@/lib/actions/user.action";
import { SubmitButton } from "./submitBtn";

export default async function EditProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const session = await getSession();
  const user = session?.user as any;

  if (user?.id !== id) redirect("/forbidden");

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pt-3  sm:px-6 lg:px-8">
      <Card>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <div>
            <p className="text-muted-foreground">Cash Back</p>
            <p className="font-bold text-red-500">₦{user.cashBack}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Debit</p>
            <p className="font-bold text-red-500">₦{user.totalDebits}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Credit</p>
            <p className="font-bold text-green-500"> ₦{user.totalCredit}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Reputation</p>
            <p className="font-bold">{user.reputation}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <form action={updateProfile} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <Input name="name" defaultValue={user?.name || ""} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Username
                </label>
                <Input name="userName" defaultValue={user?.userName || ""} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={user?.email || ""}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  name="phoneNumber"
                  defaultValue={user?.phoneNumber || ""}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Other Number
                </label>
                <Input
                  name="otherNumber"
                  defaultValue={user?.otherNumber || ""}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  defaultValue={user?.gender || ""}
                  className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{user?.gender || "Select gender"}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={
                    user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Business Name
                </label>
                <Input
                  name="businessName"
                  defaultValue={user?.businessName || ""}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Business Address
                </label>
                <Input
                  name="businessAddress"
                  defaultValue={user?.businessAddress || ""}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Bio</label>
              <Textarea name="bio" rows={5} defaultValue={user?.bio || ""} />
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
