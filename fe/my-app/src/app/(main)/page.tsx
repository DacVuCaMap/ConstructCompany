
import { ArrowRight, HardHat } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import HomePage from "@/components/HomeComponents/HomePage";

export default function Home() {
  const cookie = cookies();
  let userMail = cookie.get('email')?.value
  if (!userMail) {
    redirect('/login');
  }
  const items = [
    { title: "Sản phẩm", val: 29, Link: "/" },
    { title: "Khách Hàng", val: 29, Link: "/" },
    { title: "BBNT và XNKL", val: 29, Link: "/" },
    { title: "BBNT và GT", val: 29, Link: "/" },
    { title: "Công Nợ Còn", val: 29, Link: "/" },
  ]
  return (
    <HomePage data={items} />
  )
}
