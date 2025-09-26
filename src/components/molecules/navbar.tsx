import Link from "next/link";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/atoms/logoutButton";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Half Reps</h1>
      <div className="flex gap-4">
        {session ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {session.user.name.split(" ")[0]}</span>
            <LogoutButton />
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
