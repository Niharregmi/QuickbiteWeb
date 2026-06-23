import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profilePicture: string | null;
}

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const loginUser = async (payload: LoginPayload) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

// GET /api/v1/auth/whoami -> details of the currently logged in user
export const whoami = async (): Promise<{ success: boolean; data: UserProfile }> => {
  const token = Cookies.get("token");
  const res = await fetch(`${BASE_URL}/auth/whoami`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user details");
  return data;
};

// PATCH /api/v1/auth/update -> update profile fields and/or password and/or profile picture
// Pass a FormData instance so the profile picture file (if any) goes through multipart/form-data.
export const updateProfile = async (formData: FormData) => {
  const token = Cookies.get("token");
  const res = await fetch(`${BASE_URL}/auth/update`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    // Do NOT set Content-Type manually here - the browser sets the
    // multipart/form-data boundary automatically when body is a FormData.
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};
