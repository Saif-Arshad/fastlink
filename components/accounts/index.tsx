"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import UserModal from "./user-modal";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import SearchInput from "../search-input";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";

export const Accounts = ({ data, meta }: { data: IUser[]; meta: IMeta }) => {
  const { updateSearchParams } = useUpdateSearchParams();
  const columns = [
    { name: "Email", uid: "email" },
    { name: "FULL NAME", uid: "full_name" },
    { name: "CREATED AT", uid: "createdAt" },
    { name: "TYPE", uid: "type" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleAddUser = async (_: string, data: IUser) => {
    toast.promise(
      createUser(data).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Creating user...",
        success: "User created successfully!",
        error: "Error creating user.",
      }
    );
  };
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Users</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul> */}

      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl font-semibold">All Users</h3>
          {/* <SearchInput
            name="users"
            callback={(value) => updateSearchParams("query", value)}
          /> */}
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <UserModal mode="Add" onConfirm={handleAddUser} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          meta={meta}
          RenderCell={RenderCell}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};
