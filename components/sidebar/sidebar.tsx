import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import CompanyCard from "./companyCard";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes"; // Import the routes array
import { useSession } from "next-auth/react";
import Image from "next/image";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const session = useSession();
  const isAdmin = session.data?.user?.type === "admin";
  const sheduled = [
    "Hubby Bday",
    "Sis Aniversary",
    "Bestie Wedding"
  ]
  return (
    <aside className="h-screen z-[200] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompanyCard />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()} >
            <SidebarMenu title={"Menu"} >
              {routes
                .filter((route) => !route.admin || (route.admin && isAdmin))
                .map((route) => (
                  <SidebarItem
                    key={route.href}
                    title={route.title}
                    icon={<route.icon />}
                    isActive={pathname === route.href}
                    href={route.href}
                  />
                ))}
            </SidebarMenu>

            <div className="flex flex-col w-full">

              <ul className="w-full mt-4 space-y-3 flex flex-col">

                <SidebarMenu title={"Scheduled Events"}
                >
                  {
                    sheduled.map((item: any, index: any) => (
                      <div className="flex gap-x-4 items-center" key={index}>
                        <span className="h-3 w-3 text-sm rounded-full bg-transparent border border-[#0054a5]">

                        </span>
                        <li className="text-sm light-font">
                          {item}
                        </li>
                      </div>
                    ))
                  }

                </SidebarMenu>
              </ul>

              <div className="w-full rounded-md border p-1 group border-slate-300 cursor-pointer hover:bg-[#05549F] my-5 flex items-center">
                <Image
                  src={"/user.jpeg"}
                  alt="user"
                  height={100}
                  width={100}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <span className="text-base  font-semibold ml-2 text-[#05549F] group-hover:text-white regular-font">
                  Abdulla Lootah
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
