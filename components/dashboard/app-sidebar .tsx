"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  Tags,
  Warehouse,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants";
import { AnyARecord } from "dns";
import { Button } from "../ui/button";
import { FiLogOut } from "react-icons/fi";
import { signOutUser } from "@/lib/actions/user.action";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Bookings",
    icon: LayoutDashboard,
    items: [
      {
        title: "Bookings",
        url: "/bookings",
      },
      {
        title: "Add booking",
        url: "/add-bookings",
      },
    ],
  },
  {
    title: "Products",
    icon: Package,
    items: [
      {
        title: "All Products",
        url: "/products",
      },
      {
        title: "Categories",
        url: "/products/categories",
        icon: Tags,
      },
      {
        title: "Brands",
        url: "/products/brands",
      },
    ],
  },
  {
    title: "Inventory",
    icon: Boxes,
    items: [
      {
        title: "Stock Levels",
        url: "/inventory",
      },
      {
        title: "Stock Movement",
        url: "/inventory/movements",
      },
      {
        title: "Warehouses",
        url: "/inventory/warehouses",
        icon: Warehouse,
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
  },
  {
    title: "Customers",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar({ session }: { session: any }) {
  const pathname = usePathname();

  const user = session?.user;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className=" border-b">
        <div className="flex h-14 items-center px-4  overflow-hidden ">
          <Link href={"/"}>
            <h2 className="text-lg font-bold  ">{APP_NAME}</h2>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>

          <SidebarMenu>
            {navigation.map((item) => {
              // Regular menu item
              if (!item.items) {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // Collapsible menu group
              const isGroupActive = item.items.some(
                (subItem) =>
                  pathname === subItem.url ||
                  pathname.startsWith(`${subItem.url}/`),
              );

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={isGroupActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />

                        <span>{item.title}</span>

                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={isActive}>
                                <Link
                                  href={subItem.url}
                                  className="flex items-center gap-2"
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-4 overflow-hidden ">
          <div className="text-sm  font-bold capitalize ">{user.role} user</div>
          <div className="text-sm capitalize font-medium">{user.name} </div>
          {/* <div className="text-xs text-muted-foreground">{user.email}</div> */}
          <Button
            onClick={signOutUser}
            className="w-full  py-4 h-4 justify-start text-muted-foreground "
            variant="ghost"
          >
            <FiLogOut /> Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
