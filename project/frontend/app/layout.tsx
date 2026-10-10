import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "PredictXI — AI Cricket Analytics",
  description:
    "Build your strongest cricket XI using AI-powered player analysis and team optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />{children}
        </body>
    </html>
  );
}