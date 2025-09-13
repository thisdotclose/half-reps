import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
