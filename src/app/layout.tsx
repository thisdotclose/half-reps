import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/organisms/Navbar";

export const metadata: Metadata = {
  title: "Half Reps",
  description: "Half Reps - Gym logbook for Half Pints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
