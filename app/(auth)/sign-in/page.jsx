import SigninForm from "./signin-form";
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/get-session";

export const metadata = {
  title: "Sign In",
};

async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/";

  const session = await getSession();
  const user = session?.user;
  if (session?.user) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full">
      <SigninForm />
    </div>
  );
}

export default SignInPage;
