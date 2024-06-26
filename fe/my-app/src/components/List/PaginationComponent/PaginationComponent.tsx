import { toltalPageGlobal } from "@/data/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";


export default function PaginationComponent() {
  const searchParams = useSearchParams();
  const urlPath = usePathname();
  // const slugPath = urlPath.substring(0, urlPath.indexOf('/', 2))
  const slugPath = urlPath?.substring(0,urlPath.indexOf('/list'));
  const curPage = Number(searchParams?.get('page')) + 1;
  const urlCurPage = curPage-1;
  const pageSize = searchParams?.get('size');
  const totalPage = toltalPageGlobal.value;
  //search
  let searchKey = searchParams?.get('search');
  searchKey = searchKey ? searchKey : '';
  const urlPagination = slugPath+`/list?size=${pageSize}&search=${searchKey}&page=`
  return (
    <div className="flex w-full items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">1</span> of <span className="font-medium">{totalPage}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {curPage > 1 && <>
              <Link
                href={urlPagination+(urlCurPage-1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={urlPagination+0}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                1
              </Link></>
            }
            {curPage > 2 &&
              <><span className={`${curPage < 3 ? 'hidden' : ''}relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}>
                ...
              </span>
                <Link
                  href={urlPagination+(urlCurPage-1)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {curPage - 1}
                </Link></>
            }
            <Link
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {curPage}
            </Link>

            {curPage + 1 < totalPage &&
              <><Link
                href={urlPagination+(urlCurPage+1)}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                {curPage + 1}
              </Link><span className={`${curPage + 2 > totalPage ? 'hidden' : ''}relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}>
                  ...
                </span></>
            }
            {curPage < totalPage &&
            <><Link
                href={urlPagination+(totalPage-1)}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                {totalPage}
              </Link><Link
                href={urlPagination+curPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link></>
            }
          </nav>
        </div>
      </div>
    </div >
  )
}
