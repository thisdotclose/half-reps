"use client";
import Link from "next/link";
import { useSession, signOut } from "@/services/client";

export default function Navbar() {
  const { 
    data: session, 
    isPending,
} = useSession()

console.log(session);

const handleLogout = async () => {
  await signOut();
}

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Half Reps</h1>
      <div className="flex gap-4">
        {isPending ? (
          <div>Loading...</div>
        ) : session ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {session.user.name.split(" ")[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
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
