import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/organisms/navbar";
import QueryProvider from "./provider";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Half Reps",
  description: "Half Reps - Gym logbook for Half Pints",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
