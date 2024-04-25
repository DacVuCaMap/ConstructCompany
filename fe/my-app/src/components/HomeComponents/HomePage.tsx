"use client"
import { formatNumberWithDot } from "@/data/listData";
import { ArrowRight, HardHat } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect,useRouter } from "next/navigation";
type Props = {
    data:any[]
}
export default function HomePage(props : Props) {
    const items = props.data;
    console.log(items);
    const route = useRouter()
    
    const handleClick=(link:any)=>{
        console.log(link)
        route.push(link);
    }
    return (
        <div className="p-10 flex-1">
            <div className="bg-white shadow-lg rounded-lg px-4 py-8 relative text-black">
                <div>
                    <div className="h-20"></div>
                    <div className="flex items-center mb-6 bg-slate-900 text-white absolute left-0 top-6 py-2 px-6">
                        <HardHat className="mr-2" />
                        <h2 className="ml-2 font-bold">TIEN DONG COMPANY</h2>
                    </div>
                    <p className="block text-3xl text-gray-900 font-bold mb-4">Thống kê chung</p>
                </div>
                <div className="bg-blue-800 text-white px-2 rounded-lg flex flex-row justify-around space-x-auto flex-wrap">
                    {items.map((item: any, index:number) => (
                        <div className=" h-32 w-52 mb-4 py-6 space-y-1" key={index}>
                            <h2>{item.title}</h2>
                            <p className="text-2xl overflow-hidden font-bold">{formatNumberWithDot(item.val,2)}</p>
                            <h2 onClick={() => handleClick(item.link)} className="text-sm hover:cursor-pointer underline flex">Link to {item.title} <ArrowRight size={20} /></h2>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
