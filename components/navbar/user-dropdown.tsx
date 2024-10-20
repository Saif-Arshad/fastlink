import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const UserDropdown = () => {
  const session = useSession();
  const router = useRouter();

  const getAvatarInitial = () => {
    if (session.data?.user) {
      const { name, email } = session.data.user;
      return name
        ? name.charAt(0).toUpperCase()
        : email?.charAt(0).toUpperCase();
    }
    return "U"; // Default if no user data is available
  };

  const handleLogout = useCallback(async () => {
    await signOut();
    router.replace("/login");
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger >
          <Avatar
            as="button"
            color="primary"
            size="md"
            src="/user.jpeg"
            className="rounded-[10px] object-cover ml-7"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>
            {session.data?.user ? session.data.user.email : "User@example.com"}
          </p>
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
