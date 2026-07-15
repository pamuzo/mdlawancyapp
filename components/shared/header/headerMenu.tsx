"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Usermenu from "./user-button";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import ModeToggle from "./mode-toggle";
import { auth } from "@/lib/auth";

import { signOutUser } from "@/lib/actions/user.action";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { usePathname } from "next/navigation";
import { getSession } from "@/lib/session";

const NAV_ITEMS = [
  //   { name: "MDLawancy", href: "/" },
  { name: "Embroidery", href: "/embroidery" },
  { name: "Heat transfer", href: "/heatTransfer" },
  { name: "Screen Printing", href: "/screenprinting" },
  { name: "Engraving", href: "/engraving" },
  { name: "Learn ", href: "/learn" },
  { name: "Support", href: "/support" },
];

function HeaderMenu({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) {
  const [open, setOpen] = useState(false);
  // const session = getSession();
  const user = session?.user;

  const pathname = usePathname();

  return (
    <div>
      <header className=" shadow-sm sticky top-0 z-50 pb-2">
        {/* <div className=" flex  px-4 justify-between text-center flex-col md:flex-row">
        <h3 className="hidden md:flex  p-2 ">Welcome to MD LAWANCY LIMITED</h3>
        <h3 className="  p-2 ">free shipping in Auchi on orders over 3000k</h3>
      </div> */}

        <div className="max-w-7xl mx-auto pt-3  sm:px-6 lg:px-8 flex items-center ">
          <div className="flex shrink-0 px-2 lg:w-[15%] ">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={70}
                height={70}
                priority
              />
            </Link>
          </div>

          {/* Search input*/}
          <div className="flex grow flex-col gap-4 pt-2 sm:px-0 items-end ">
            <div className="flex w-full  justify-between pl-6 ">
              <div className=" relative w-full ">
                <ButtonGroup className="hidden md:flex absolute top-0 left-0 w-full max-w-xl">
                  <Input
                    id="input-button-group"
                    placeholder="Search Products..."
                  />
                  <Button variant="outline">Search</Button>
                </ButtonGroup>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-end w-full md:w-auto  pr-5 gap-3 ">
                <ModeToggle />
                <Link href="#" className="hidden sm:flex  text-xl">
                  Shop
                </Link>
                {/* <BsCart4 className=" text-2xl" /> */}

                {!session ? (
                  <Link href="/sign-in">
                    <Button
                      variant={"ghost"}
                      className="flex  items-center text-2xl   hover:text-[#00425A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00425A] font-semibol2"
                    >
                      <UserIcon style={{ width: 24, height: 24 }} />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Usermenu session={session} signOutUser={signOutUser} />
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex justify-between items-end-safe w-full  gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 transition ${
                    pathname === item.href
                      ? "font-bold text-primary"
                      : "hover:font-bold"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="tel:+2348140394714"
                className="hidden lg:block pl-8 text-lg font-bold"
              >
                +234 814 039 4714
              </a>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden ml-2">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="p-2 rounded-md  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Toggle menu</span>
              {open ? (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden  border-t border-gray-200" id="mobile-menu">
            <nav className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={` transition 
                    block px-3 py-2 rounded-md  hover:bg-gray-50 hover:text-gray-900 
                    ${
                      pathname === item.href
                        ? "font-bold text-primary"
                        : "hover:font-bold"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={user ? "/profile" : "/sign-in"}
                className="block px-3 py-2 mt-2  rounded-md "
                onClick={() => setOpen(false)}
              >
                {user ? `Profile (${user.email})` : "Sign in"}
              </a>

              {/* Social icons in mobile menu */}
              <div className="flex justify-center gap-4 pt-3 ">
                <Link href="" target="_blank" aria-label="Facebook">
                  <FaFacebookSquare size={22} />
                </Link>

                <Link href="" target="_blank" aria-label="Instagram">
                  <FaInstagram size={22} />
                </Link>

                <Link href="" target="_blank" aria-label="Tiktok">
                  <FaTiktok size={22} />
                </Link>

                <Link href="" target="_blank" aria-label="Twitter">
                  <FaTwitter size={22} />
                </Link>

                <Link href="" target="_blank" aria-label="Youtube">
                  <FaYoutube size={22} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

export default HeaderMenu;
