'use server'
import Link from 'next/link';
import React from 'react'

export default async function PaginationHandleItem(totalPage: number, curPage: number, slugPath: string) {
    const items = [];
    let count = 1;
    while (count < totalPage + 1) {
      console.log(1)
      items.push(
        <Link
          key={count}
          href={`/${slugPath}/get?size=10&page=${curPage - 1}`}
          aria-current="page"
          className={`${count === curPage ? 'bg-indigo-600' : ''}relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {curPage}
        </Link>)
      if (count > curPage - 2 || count < curPage + 2) {
        <span key={`ellipsis-${count}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        count=(count < curPage-2) ? curPage-2 : totalPage-1
      }
      count++;
    }
   return items; 
}
