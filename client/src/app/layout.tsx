import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "@/redux/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies, headers } from "next/headers";
import Component from "./auth/login/page";
import Login from "./auth/login/page";
import Signup from "./auth/signup/page";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nestjs CRUD",
  description: "A Smart CRUD App with user authentication and PostgreSQL storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies();
  const token = cookie.get("token");

  // Use headers() to get the full URL
  const headersList = headers();
  const referer = headersList.get("referer"); // Use referer header to get the full request URL

  // Extract the pathname from the referer URL
  const currentPath = referer ? new URL(referer).pathname : "/";

  // Hide Navbar and Footer on signup/login routes
  const hidden = ["/auth/signup", "/auth/login"].includes(currentPath);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
