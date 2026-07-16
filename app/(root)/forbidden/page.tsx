import AdsterraBanner from "@/adsterra/adsterra";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center py-30">
        {/* <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={APP_NAME}
        priority={true}
        /> */}
        <div className="p-6 w-1/3rounded-lg shadow-md text-center">
          <div>
            <h1>403 - Forbidden</h1>
            <p className="text-destructive">
              You do not have permission to access this page.
            </p>
          </div>
          <Button variant="outline" className="mt-4 ml-2">
            <Link href="/sign-in">Go to Sign In</Link>
          </Button>
        </div>
      </div>
      <AdsterraBanner />
    </main>
  );
}
