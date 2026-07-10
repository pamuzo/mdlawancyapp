import Footer from "@/components/Footer";
import Header from "@/components/shared/header";
import { getSession } from "@/lib/get-session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <div className="flex h-screen flex-col">
      <Header session={session} />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
