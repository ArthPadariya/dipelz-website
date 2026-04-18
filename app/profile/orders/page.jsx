import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfileOrders from "./ProfileOrders";
import LogoutButton from "./LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-10">
          My Account
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-8 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Account Information
            </h2>
            <p className="text-gray-600">
              {session.user.email}
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* ORDER HISTORY */}
        <div>
          <ProfileOrders />
        </div>

      </div>
    </div>
  );
}