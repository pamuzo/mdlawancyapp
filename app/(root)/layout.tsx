import Footer from "@/components/Footer";
import PWAInstall from "@/components/pwa-install";
import Header from "@/components/shared/header";
import WhatsAppButton from "@/components/shared/whatsapp";
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

      <main className="flex-1 ">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
