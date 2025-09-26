"use client";

import { signOut } from "@/services/client";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
}
