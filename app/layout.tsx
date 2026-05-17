import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dental LeadPilot AI",
  description:
    "AI-powered SMS and email follow-up for dental clinic enquiries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
