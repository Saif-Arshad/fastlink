"use server";

import axiosInstance from "@/config/axios";
import { IProduct, Result } from "@/helpers/types";
import axios from "axios";

// Fetch all products
export async function getProducts({
  query,
  page = 1,
  limit = 10,
  tableId,
  currentTable
}: any) {
  // console.log("🚀 ~ currentTable:", currentTable)

  try {
    const response = await axiosInstance.get("/api/products", {
      params: { query, page, limit, tableId, currentTable },
    });
    const { data } = response.data;
    console.log("🚀 ~ data:", data)

    return {
      data: data,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to fetch products";
    // console.error("Fetch products failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function uploadImages(data: any,) {
  // console.log("🚀 ~ uploadImages ~ data:", data)

  try {
    const response = await axiosInstance.post("/api/products/upload-images", data);

    return response.data;
  } catch (error) {
    // console.log("Error uploading images:", error);
    throw new Error("Failed to upload images. Please try again.");
  }
}


//  fetch all tables names
export async function getTablesNames() {
  try {
    const response = await axiosInstance.get("/api/products/table/name");
    const { data } = response.data;
    // console.log("🚀 ~ data:", data)

    return {
      data: data,
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to fetch tables names";
    return { error: errorMessage };

  }
}
// Fetch a single product by ID
export async function getProductById(productId: string, tableId: string) {
  try {
    const response = await axiosInstance.get(`/api/products/${tableId}?item=${productId}`);
    // console.log(response.data)
    return { data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || "Fetch product failed";
      // console.error("Fetch product failed:", errorMessage);
      return { error: errorMessage };
    } else {
      // Handle unexpected errors
      // console.error("Unexpected error:", error.message || error);
      return { error: "An unexpected error occurred" };
    }
  }
}
// Create a new product
export async function createProduct(data: any): Promise<Result<IProduct>> {
  // console.log("🚀 ~ createProduct ~ data:", data)
  // const productArray= Array.isArray(data) ? data : [data];
  try {
    const response = await axiosInstance.post("/api/products", data);
    // console.log("🚀 ~ createProduct ~ response:", response.data)
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Create product failed";
    // console.error("Create product failed:", errorMessage);
    return { error: errorMessage };
  }
}

// Update a product by ID
export async function updateProduct(
  productId: string,
  tableId: string,
  data: IProduct
): Promise<Result<IProduct>> {
  const payload = {
    ...data,
    tableId
  }
  try {
    const response = await axiosInstance.put(
      `/api/products/${productId}`,
      payload
    );
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Update product failed";
    // console.error("Update product failed:", errorMessage);
    return { error: errorMessage };
  }
}

// Delete a product by ID
export async function deleteProduct(
  productId: string,
  tableId: string,
): Promise<Result<{ message: string }>> {

  try {
    const response = await axiosInstance.delete(`/api/products/${productId}-${tableId}`);
    return { data: { message: "Product deleted successfully" } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Delete product failed";
    return { error: errorMessage };
  }
}
// Delete a table by ID
export async function deleteTable(
  TableId: string
): Promise<Result<{ message: string }>> {
  try {
    const response = await axiosInstance.delete(`/api/products/table/${TableId}`);
    return { data: { message: "Table deleted successfully" } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Delete Table failed";
    // console.error("Delete Table failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function sendInvitation(tableId: string, data: any) {
  const payload = {
    tableId,
    Ids: data,
  };

  try {
    const response = await axiosInstance.post(`/api/products/permission`, payload);
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Send Invitation failed";
    // console.error("Send Invitation failed:", errorMessage);
    return { error: errorMessage };
  }
}
