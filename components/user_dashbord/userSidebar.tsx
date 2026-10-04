"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  ChevronDown,
  HandCoins,
  Home,
  HomeIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PiggyBank,
  Receipt,
  Settings,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { APP_NAME } from "@/lib/constants";
import { signOutUser } from "@/lib/actions/user.action";

const mainNavigation = [
  {
    title: "Overview",
    href: "/profile",
    icon: LayoutDashboard,
  },
  {
    title: "Wishlists",
    href: "/wishlists",
    icon: TrendingUp,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: PiggyBank,
  },
  {
    title: "Bookings",
    href: "/userbooking",
    icon: PiggyBank,
  },
  {
    title: "Shop",
    href: "/Shop",
    icon: Building2,
  },
  {
    title: "Gallary",
    href: "/gallary",
    icon: HandCoins,
  },
  // {
  //   title: "Games",
  //   href: "/games",
  //   icon: Receipt,
  // },
];

const accountNavigation = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "KYC Verification",
    href: "/kyc",
    icon: ShieldCheck,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function UserSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <SidebarHeader className="border ">
        <div className="flex h-14 items-center px-4  overflow-hidden ">
          <Link href={"/"}>
            <h2 className="text-lg font-bold hover:text-slate-700">
              {APP_NAME}
            </h2>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* ===================================================
            MAIN
        ==================================================== */}

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      tooltip={item.title}
                      isActive={active}
                      className={
                        active
                          ? " text-white hover:bg-slate-800 hover:text-white data-[active=true]:bg-slate-600 data-[active=true]:text-white"
                          : "text-slate-600 hover:bg-slate-800"
                      }
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ===================================================
            ACCOUNT
        ==================================================== */}

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {accountNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      tooltip={item.title}
                      isActive={active}
                      className={
                        active
                          ? "bg-green-50 text-slate-900"
                          : " hover:bg-slate-700 hover:text-slate-50"
                      }
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =====================================================
          FOOTER / USER
      ====================================================== */}

      <SidebarFooter>
        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" className="hover:bg-slate-700" />
                }
              >
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name,
                    )}`
                  }
                  alt={user.name}
                  className="size-8 rounded-full border border-white object-cover shadow-xl"
                />

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold ">{user?.name}</span>

                  <span className="truncate text-xs text-slate-400">
                    {user?.email}
                  </span>
                </div>

                <ChevronDown className="ml-auto size-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
              </DropdownMenuTrigger>

              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="size-4" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={signOutUser}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
