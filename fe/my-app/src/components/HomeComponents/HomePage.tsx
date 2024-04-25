"use client"
import { ArrowRight, HardHat } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect,useRouter } from "next/navigation";
type Props = {
    data:any[]
}
export default function HomePage(props : Props) {
    const items = props.data;
    const route = useRouter()
    
    const handleClick=(link:any)=>{
        route.push(link);
    }
    return (
        <div className="p-10 bg-red-500 flex-1">
            <div className="bg-white shadow-md rounded-lg px-12 py-8 relative text-black">
                <div>
                    <div className="h-20"></div>
                    <div className="flex items-center mb-6 bg-slate-900 text-white absolute left-0 top-6 py-2 px-6">
                        <HardHat className="mr-2" />
                        <h2 className="ml-2 font-bold">TIEN DONG COMPANY</h2>
                    </div>
                    <p className="text-lg text-gray-700">Thống kê chung</p>
                    {/* {!userMail ? <Link href="/login" className="mt-4 flex w-40 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700">Get Started <ArrowRight /></Link>
            : <span className="font-bold">{userMail}</span>} */}
                </div>
                <div className="bg-blue-800 text-white rounded-lg flex flex-row justify-around space-x-auto flex-wrap font-bold">
                    {items.map((item: any, index:number) => (
                        <div className=" h-32 w-48 mb-4 py-6 space-y-1" key={index}>
                            <h2>{item.title}</h2>
                            <p className="text-3xl">29</p>
                            <h2 onClick={() => handleClick(item.link)} className="text-sm hover:cursor-pointer underline flex">Link to sản phẩm <ArrowRight size={20} /></h2>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
