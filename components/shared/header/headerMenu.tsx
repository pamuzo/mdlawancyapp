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
import { IoClose, IoSearchOutline } from "react-icons/io5";
import ModeToggle from "./mode-toggle";
import { auth } from "@/lib/auth";

import { signOutUser } from "@/lib/actions/user.action";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  //   { name: "MDLawancy", href: "/" },
  { name: "Embroidery", href: "/about" },
  { name: "Heat transfer", href: "/services" },
  { name: "Screen Printing", href: "/contact" },
  { name: "Engraving", href: "/contact" },
  { name: "Learn ", href: "/contact" },
  { name: "Support", href: "/contact" },
];

function HeaderMenu({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

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
              <Image src="/images/logo.svg" alt="Logo" width={64} height={64} />
            </Link>
          </div>

          {/* Search input*/}
          <div className="flex grow flex-col gap-4 pt-2 sm:px-0 items-end ">
            <div className="flex w-full  justify-between pl-6 ">
              <div className=" relative w-full ">
                <input
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  placeholder="Search Products..."
                  className="hidden md:block w-full grow  max-w-xl hover:ring-gray-400 ring-1 ring-gray-300 ring-inset text-gray-800  border-0 bg-gray-200 rounded-full  px-3 py-2 focus:outline-none"
                />
                {searchText ? (
                  <IoClose
                    onClick={() => setSearchText("")}
                    className="absolute top-2.5 right-57  text-gray-600"
                  />
                ) : (
                  <IoSearchOutline className="hidden md:block absolute top-2.5 right-57  text-gray-600" />
                )}
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-end w-full md:w-auto  pr-5 gap-3 ">
                <ModeToggle />
                {/* <Link href="#" className="hidden sm:flex  text-xl">
                  Shop
                </Link>
                <BsCart4 className=" text-2xl" /> */}

                {!session ? (
                  <Link href="/sign-in">
                    <Button
                      variant={"ghost"}
                      className="flex  items-center gap-2"
                    >
                      <UserIcon className="text-xl" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Usermenu session={session} signOutUser={signOutUser} />
                )}

                {/* <Link
                href="/sign-in"
                variant="default"
                // className="ml-4  min-w-[100px] items-center text-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#00425A] hover:bg-[#002e3f] transition-colors duration-300"
              >
                <FiUser className="text-[#00425A] text-2xl" />
              </Link> */}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex justify-between items-end-safe w-full  gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className=" hover:font-bold px-2   transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              <h2 className="hidden lg:block  pl-8 text-lg font-bold">
                {/* <span className="mr-1">
                <IoCallOutline />
              </span> */}
                +2348140394714
              </h2>
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
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
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
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
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
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md  hover:bg-gray-50 hover:text-gray-900 transition"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/login"
                className="block px-3 py-2 mt-2  rounded-md "
                onClick={() => setOpen(false)}
              >
                Sign in
              </a>

              {/* Social icons in mobile menu */}
              <div className="flex justify-center gap-4 pt-3 ">
                <FaFacebookSquare size={22} />
                <FaInstagram size={22} />
                <FaTiktok size={22} />
                <FaTwitter size={22} />
                <FaYoutube size={22} />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

export default HeaderMenu;
