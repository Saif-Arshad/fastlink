import React from "react";
import Login from "@/components/auth/login";
import { redirect } from "next/navigation";
const login = ({ searchParams }: { searchParams: { error?: string } }) => {
  redirect("/dashboard");
  // return <Login searchParams={searchParams} />;
};

export default login;
