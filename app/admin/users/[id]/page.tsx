import { fetchUserByIdAction } from "@/lib/actions/user-action";
import Link from "next/link";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userResponse = await fetchUserByIdAction(id);

  if (!userResponse.success) {
    throw new Error(userResponse.message || "Failed to fetch user");
  }

  if (!userResponse.data) {
    throw new Error("No user data available");
  }

  const user = userResponse.data;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/users"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Back to List
          </Link>
          <Link
            href={`/admin/users/${id}/edit`}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Edit User
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
            <p className="text-gray-900 font-medium text-lg">{user.fullName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
            <p className="text-gray-900">{user.phoneNumber || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Role</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-1 ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {user.role}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
            <p className="text-gray-900">{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
            <p className="text-gray-500 font-mono text-sm">{user._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
