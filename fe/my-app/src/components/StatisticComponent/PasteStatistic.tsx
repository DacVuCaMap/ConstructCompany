import GetPattern from '@/ApiPattern/GetPattern'
import GetPatternMinh from '@/ApiPattern/GetPatternMinh'
import React, { useState } from 'react'
import LoadingScene from '../LoadingScene'
import { numberWithoutDots } from '@/data/listData'
import Spreadsheet, { Matrix } from 'react-spreadsheet'
import { BeatLoader } from 'react-spinners'
import { Clipboard } from 'lucide-react';
import { ParentStatisticItem } from '@/model/ParentStatisticItem'
import { StatisticItem } from '@/model/StatisticItem'
// type StatisticItem = {
//     id: number, day: string, licensePlate: string
//     , trailer: string, ticket: string, typeProduct: string
//     , proId: number, unit: string, price: number
//     , materialWeight: number, note: string
// }

// type ParentStatisticItem = { proName: string, proUnit: string, proPrice: number, proId: number, statisticItems: StatisticItem[] }
type Props = {
    items: any,
    setItems: React.Dispatch<React.SetStateAction<ParentStatisticItem[]>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPasteSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PasteStatistic(props: Props) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [valueText, setValueText] = useState<any>();
    const handleTextArea = async (val: any) => {
        setValueText(val);
    }
    const handleClick = async () => {
        setLoading(true);
        setError("");
        let flag = false;
        let uniqueCode = Date.now();
        const rs = data.map((items: any[]) => {
            for (let i = 0; i < items.length; i++) {
                if (i === 3 || i === 7) {
                    continue; // Bỏ qua các index là 3 và 7
                }
            
                if (!items[i].value) {
                    console.log("items " + i + ": null");
                    return;
                }
            }
            let trailer = items[3] ? items[3].value : "";
            let note = items[7] ? items[7].value : "";
            let materialWeight = parseFloat(items[5].value.replace(",", "."))
            if (isNaN(materialWeight)) {
                setError("Khối lượng không phải số");
                flag = true;
                return;
            }
            //set date
            let [day,month,year] = items[0].value.split('/');
            const date = new Date(year,month-1,day);
            return {
                id: uniqueCode++,
                day: date,
                licensePlate: items[2].value,
                trailer: trailer,
                ticket: items[1].value,
                typeProduct: items[4].value,
                proId: null,
                unit: null,
                price: numberWithoutDots(items[6].value),
                materialWeight: materialWeight,
                note: note
            }
        })
        console.log(rs);
        if (!rs || !rs[0]) {
            setError("Không Hợp Lệ")
            setLoading(false);
            return;
        }
        // console.log(error)
        if (!flag) {
            const promises = rs.map(async (item: any) => {
                if (item) {
                    let url = process.env.NEXT_PUBLIC_API_URL + "/api/product/find-cus/" + item.typeProduct;
                    const response = await GetPatternMinh(url, {});
                    // console.log(response);
                    if (!response) {
                        setError("Lỗi không tìm thấy product: " + item.proName)
                        flag = true
                        return null;
                    }
                    return { ...item, proId: response.id, unit: response.unit }
                }
            })
            if (!flag) {
                let updateData: StatisticItem[] = await Promise.all(promises);
                // console.log(updateData);
                const temp = props.items;
                updateData.map((item: StatisticItem) => {
                    if (item) {
                        let parent = temp.find((obj: ParentStatisticItem) => obj.proId == item.proId);
                        // console.log(item);
                        if (parent) {
                            let index = temp.findIndex((obj: ParentStatisticItem) => obj.proId == item.proId)
                            parent.statisticItems.push(item);
                            temp[index] = parent;
                        }
                        else {
                            let newParent: ParentStatisticItem = {
                                proName: item.typeProduct, proId: item.proId, proUnit: item.unit, proPrice: item.price, statisticItems: [item]
                            }
                            temp.push(newParent);
                        }
                    }
                })
                props.setItems(temp);
                // console.log(props.items);
                props.setPasteSuccess(true);
                props.setOpen(false);
            }
        }
        setLoading(false);

    }
    const columnLabels = ["Ngày", "Số phiếu", "Biển xe", "Rơ moóc", "Loại hàng", "Khối lượng", "Đơn giá","Ghi chú"];
    const [data, setData] = useState<Matrix<never>>([[]]);
    const handleDataChange = (newData: Matrix<never>) => {
        console.log(newData);
        setData(newData);
    };
    const handlePast = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (clipboardText) {
                // console.log(clipboardText)
                let rs: any;
                rs = clipboardText.split('\n').filter((line: any) => line.trim() !== '')
                    .map((line: any, index: number) => {
                        let arr = line.split("\t");
                        let rs : any[] = [];
                        arr.map((val:string)=>{rs.push({value:val})})
                        // console.log(rs);
                        return rs;
                    });
                // console.log(rs);
                setData(rs);
            }
        } catch (err) {
            console.error('Không thể đọc dữ liệu từ clipboard:', err);
        }
    }
    return (
        <div className='relative'>
            <button type='button' className="flex items-center gap-2 my-4" onClick={() => handlePast()}>
                <Clipboard /> <span className='font-bold underline'>Paste Data</span>
            </button>
            <div>
                {error && <span className='text-red-500'>{error}</span>}
            </div>
            {loading ?
                <div className='h-40 w-96 shadow-lg bg-white font-bold flex justify-center items-center'> <BeatLoader color="#000000" /> Loading</div>
                :
                <div>
                    <div>
                        <Spreadsheet
                            data={data}
                            columnLabels={columnLabels}
                            onChange={handleDataChange}
                        />
                    </div>
                    <button type='button' className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleClick()}>Confirm</button>
                </div>}


        </div>
    )
}