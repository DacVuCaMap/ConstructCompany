import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tien Dong Company",
  description: "Materials Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
