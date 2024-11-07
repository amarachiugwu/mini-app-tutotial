import type { Metadata } from "next";
import "./globals.css";
import DashboardLayoutShell from "@/components/layouts/dashboard/ui/DashboardLayoutShell";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Starter Kit",
  description: "Asset Chain Mini App starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} `}>
        <DashboardLayoutShell>{children}</DashboardLayoutShell>
      </body>
    </html>
  );
}
