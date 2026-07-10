import { getSession } from "../../lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return <div className="flex-center  min-h-screen w-full">{children}</div>;
}
