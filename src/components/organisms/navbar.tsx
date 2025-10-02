"use client";
import Link from "next/link";
import { signOut, useSession } from "@/services/client";
import { useRouter } from "next/navigation";
import { Session, User } from "better-auth";



type SessionWithUser = {
  session: Session;
  user: User;
};

type NavbarProps = {
  session: SessionWithUser | null;
}

export default function Navbar({ session: serverSession }: NavbarProps) {
  const router = useRouter();
  const { data: clientSession, isPending } = useSession();
  // Use server session until client session is loaded
  const _session = isPending ? serverSession : clientSession;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Half Reps</h1>
      <div className="flex gap-4">
        {_session ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {_session.user.name?.split(" ")[0]}</span>
            <button
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.replace("/login");
                    },
                  },
                })
              }
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
    </nav>
  );
}
