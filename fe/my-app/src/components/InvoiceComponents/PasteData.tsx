import GetPattern from '@/ApiPattern/GetPattern'
import GetPatternMinh from '@/ApiPattern/GetPatternMinh'
import React, { useState } from 'react'
import LoadingScene from '../LoadingScene'
import { numberWithoutDots } from '@/data/listData'
type Props = {
    items: any,
    setItems: React.Dispatch<React.SetStateAction<Detail[]>>,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setPasteSuccess:React.Dispatch<React.SetStateAction<boolean>>
}
type Detail = { id: number, productId: number, proName: string, unit: string, materialWeight: number, price: number, isOpen: boolean }
export default function PasteData(props:Props) {
    const [error, setError] = useState("");
    const [loading,setLoading]=useState(false);
    const [valueText, setValueText] = useState<any>();
    const handleTextArea = async (val: any) => {
        setValueText(val);
    }
    const handleClick = async () => {
        setLoading(true);
        setError("");
        let flag=false;
        let uniqueCode=Date.now();
        let rs = valueText.split('\n')
            .filter((line: any) => line.trim() !== '')
            .map((line: any, index: number) => {
                const [id, productName, unit, materialWeight, price] = line.split("\t");
                if (!id || !productName || !unit || !materialWeight || !price) {
                    setError("Form bảng không hợp lệ (copy từ stt kéo xuống)")
                    flag=true;
                    console.log(error)
                    return;
                }
                return {
                    id: uniqueCode++,
                    productId: null,
                    proName: productName.trim(),
                    unit: unit,
                    materialWeight: parseFloat(materialWeight.replace(",", ".")),
                    price: numberWithoutDots(price),
                    isOpen: false
                };
            });
        // console.log(rs);
        console.log(error)
        if (!flag) {
            const promises = rs.map(async (item: any) => {
                let url = process.env.NEXT_PUBLIC_API_URL + "/api/product/find-cus/" + item.proName;
                const response = await GetPatternMinh(url, {});
                // console.log(response);
                if (!response) {
                    setError("Lỗi không tìm thấy product: " + item.proName)
                    flag=true
                    return null;
                }
                return { ...item, productId: response.id }
            })
            if (!flag) {
                const updateData : Detail[]  = await Promise.all(promises);
                const temp = props.items;
                updateData.map((item:Detail)=>{
                    temp.push(item);
                })
                props.setItems(temp);
                console.log(props.items);
                props.setPasteSuccess(true);
                props.setOpen(false);
            }
        }
        setLoading(false);
        
    }
    return (
        <div className='relative'>
            <div>
                {error && <span className='text-red-500'>{error}</span>}
            </div>
            <textarea
                className={`${error ? 'border-red-500' : 'border-gray-300'} w-full min-h-40 h-auto border-2 rounded-lg p-2 `}
                placeholder="Dán vào đây (copy từ số thứ tự)"
                onChange={(e) => handleTextArea(e.target.value)}
            ></textarea>
            <button type='button' className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleClick()}>Confirm</button>
            {loading && <div className='absolute top-0 left-0 w-full h-full opacity-50 text-white text-center bg-black'> <span>Loadingg.....</span></div>}
        </div>
    )
}
