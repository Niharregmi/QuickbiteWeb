"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api/v1";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: string;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersResponse {
  success: boolean;
  message?: string;
  data?: User[];
  meta?: PaginationMeta;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: User;
}

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function fetchUsersAction(params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<UsersResponse> {
  try {
    const token = await getAuthToken();
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);

    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}/admin/users?${query.toString()}`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch (error: any) {
    console.error("fetchUsersAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

export async function fetchUserByIdAction(id: string): Promise<UserResponse> {
  try {
    const token = await getAuthToken();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch (error: any) {
    console.error("fetchUsersAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

export async function createUserAction(payload: any): Promise<UserResponse> {
  try {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch (error: any) {
    console.error("fetchUsersAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

export async function updateUserAction(
  id: string,
  payload: any
): Promise<UserResponse> {
  try {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch (error: any) {
    console.error("fetchUsersAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

export async function deleteUserAction(
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const token = await getAuthToken();
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers,
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch (error: any) {
    console.error("fetchUsersAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}
