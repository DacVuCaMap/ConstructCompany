
import { ArrowRight, HardHat } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import HomePage from "@/components/HomeComponents/HomePage";
import GetPattern from "@/ApiPattern/GetPattern";

export default async function Home() {
  const cookie = cookies();
  let userMail = cookie.get('email')?.value
  let check = cookie.get('jwt')?.value
  if (!userMail || !check) {
    redirect('/login');
  }
  let url = process.env.NEXT_PUBLIC_API_URL + '/api/home/getNbr'
  // console.log(url);
  const response = await GetPattern(url,{});
  // console.log(response);
  if (response.status && response.status===400) {
    redirect('/login');
  }
  const data:any[]=response;
  const items = [
    { id:1,title: "Sản phẩm", val: 29, link: "/product/get?size=10&page=0" },
    { id:2,title: "Khách Hàng", val: 29, link: "/customer/get?size=10&page=0" },
    { id:3,title: "BBNT và XNKL", val: 29, link: "/invoice/list?size=10&page=0" },
    { id:4,title: "BBNT và GT", val: 29, link: "/statistic/list?size=10&page=0" },
    { id:5,title: "Công Nợ", val: 29, link: "/payment/list?size=10&page=0" },
  ]
  for (let i = 0; i < items.length; i++) {
    items[i].val=response[i].value    
  }
  return (
    <HomePage data={items} />
  )
}
