import Footer from "@/components/Footer";
import Header from "@/components/shared/header";
import WhatsAppButton from "@/components/whatsapp";
import { getSession } from "@/lib/get-session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <div className="flex min-h-svh flex-col">
      <Header session={session} />

      <main className="min-w-0 flex-1">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
