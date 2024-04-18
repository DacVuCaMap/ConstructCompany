"use client"
import { sideBarAdmin } from '@/data/data'
import { HardHat } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { userData } from '@/data/authenticate'
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props={
  userMail:any
}
export default function SideBar(props: Props) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(0);
  const handleClick = (id: number) => {
    setActiveLink(id);
  };
  const handleLogout = async () => {

    let url = process.env.NEXT_PUBLIC_API_URL + '/api/auth/logout'

    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      Cookies.remove('email');
      Cookies.remove('admin');
      Cookies.remove('id');
      window.location.href = '/login';
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" text-white bg-slate-900 w-64 fixed h-screen py-4 px-6 flex flex-col overflow-auto">
      <div className="flex items-center mb-6 ">
        <HardHat className="text-white mr-2" />
        <h2 className="ml-2">COMPANY CONSTRUCT</h2>
      </div>
      {sideBarAdmin.map((item) => (
        <div className="mb-8" key={item.id}>
          <span className="text-sm font-bold mb-2 block">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              key={listItem.id}
              href={listItem.url}
              className={`block p-5 rounded py-2 hover:text-green-300 ${activeLink === listItem.id ? 'bg-black ' : ''}`}
              onClick={() => handleClick(listItem.id)}
            >
              {listItem.title}
            </Link>
          ))}
        </div>
      ))}

      <div>
        {
          props.userMail && <span onClick={() => handleLogout()} className="block py-2 hover:text-green-300 hover:cursor-pointer">
            Logout
          </span>
        }
      </div>
    </div>
  );
}
