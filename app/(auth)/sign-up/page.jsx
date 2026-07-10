import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";
import { getSession } from "../../../lib/get-session";
export const metadata = {
  title: "Sign Up",
};

async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/";
  const session = await getSession();

  if (session?.user) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full">
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
