"use client"
import { sideBarAdmin } from '@/data/data'
import { HardHat } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SideBar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (index:any) => {
    setActiveLink(index);
  };

  return (
    <div className="bg-green-900 text-white w-64 fixed h-screen py-4 px-6 flex flex-col overflow-auto">
      <div className="flex items-center mb-6">
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
              className={`block py-2 hover:text-green-300 ${
                activeLink === listItem.id ? 'bg-black' : ''
              }`}
              onClick={() => handleClick(listItem.id)}
            >
              {listItem.title}
            </Link>
          ))}
        </div>
      ))}

      <div>
        <Link href="/login" className="block py-2 hover:text-green-300">
          Logout
        </Link>
      </div>
    </div>
  );
}
