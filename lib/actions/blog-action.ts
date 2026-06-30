"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api/v1";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId?: { email: string; fullName?: string };
}

export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
}

export interface BlogsResponse {
  success: boolean;
  message?: string;
  data?: Blog[];
  pagination?: PaginationMeta;
}

export interface BlogResponse {
  success: boolean;
  message?: string;
  data?: Blog;
}

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

// GET /api/v1/blogs?page=&size=&search=
export async function fetchBlogsAction(params: {
  page?: number;
  size?: number;
  search?: string;
}): Promise<BlogsResponse> {
  try {
    const token = await getAuthToken();
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.size) query.set("size", String(params.size));
    if (params.search) query.set("search", params.search);

    const res = await fetch(`${BASE_URL}/blogs?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("fetchBlogsAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

// GET /api/v1/blogs/:id
export async function fetchBlogByIdAction(id: string): Promise<BlogResponse> {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("fetchBlogsAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

// POST /api/v1/blogs
export async function createBlogAction(payload: {
  title: string;
  content: string;
}): Promise<BlogResponse> {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("fetchBlogsAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

// PATCH /api/v1/blogs/:id
export async function updateBlogAction(
  id: string,
  payload: { title?: string; content?: string }
): Promise<BlogResponse> {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("fetchBlogsAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}

// DELETE /api/v1/blogs/:id
export async function deleteBlogAction(
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("fetchBlogsAction error:", error);
    return { success: false, message: "Failed to connect to server: " + error.message };
  }
}
