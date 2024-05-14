//root layout
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { userData } from "@/data/authenticate";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useEffect } from "react";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const cookie = cookies();
  let isAdminRole = cookie.get('admin')?.value
  let userMail = cookie.get('email')?.value
  
  return (
    <div className="flex ">
      <div className="lg:block hidden">
        <SideBar userMail={userMail} />
      </div>
      <div className="lg:pl-64 pl-0 flex w-full h-full min-h-screen flex-col bg-slate-300">
        <Header userMail={userMail} isAdminRole={isAdminRole} />
        <div className="flex flex-col bg-gray-300 flex-1 pt-4 text-black">
          {children}
        </div>
      </div>
    </div>
  );
}
