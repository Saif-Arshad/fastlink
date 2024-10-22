"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/config/axios";
import { IUser, Result } from "@/helpers/types";
import axios from "axios";

export async function signOut(): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.post("/api/users/sign-out");

    // Clear the token from local storage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }

    return { data: { message: "Logged out successfully" } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Sign out failed";
    // console.error("Sign out failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function deleteUser(
  userId: string
): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.delete(`/api/users/${userId}`);

    return { data: { message: "User deleted successfully" } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Delete user failed";
    // console.error("Delete user failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function getUserById(
  id: string
): Promise<Result<{ user: IUser }>> {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`);

    return { data: { user: res.data.body.user } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Delete user failed";
    // console.error("Delete user failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function editUser(
  userId: string,
  data: IUser
): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, data);

    return { data: response.data.body.updated_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Edit user failed";
    // console.error("Edit user failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function createUser(data: IUser): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.post("/api/users", {
      ...data,
      _id: null,
    });

    return { data: response.data.body.new_admin_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Create user failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function inviteUser(data: any) {
  try {
    const response = await axiosInstance.post("/api/users/invite", {
      email: data
    });

    return { data: response.data.body };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Invite Member failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function AuthUser(data: any) {
  try {
    const response = await axiosInstance.post("/api/users/authenticate", {
      id: data
    });

    return { data: response.data.success };
  } catch (error: any) {
    console.log("🚀 ~ AuthUser ~ error:", error)
    const errorMessage = error.response?.data?.error || "authentication Member failed";
    return { error: errorMessage };
  }
}

export async function getAllUsers({
  query,
  page,
  limit,
}: {
  query?: string;
  page?: number;
  limit?: number;
}): Promise<Result<{ users: IUser[] }>> {
  try {
    const response = await axiosInstance.get("/api/users", {
      params: { query, page, limit },
    });

    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    // console.error("Fetch users failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getAllUsersWithOutPagination() {
  try {
    const response = await axiosInstance.get("/api/users/getUsers",);

    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    // console.error("Fetch users failed:", errorMessage);
    return { error: errorMessage };
  }
}
