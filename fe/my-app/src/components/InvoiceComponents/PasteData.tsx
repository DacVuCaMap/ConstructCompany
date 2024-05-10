import GetPattern from '@/ApiPattern/GetPattern'
import GetPatternMinh from '@/ApiPattern/GetPatternMinh'
import React, { useState } from 'react'
import LoadingScene from '../LoadingScene'
import { numberWithoutDots } from '@/data/listData'
import Spreadsheet, { Matrix } from 'react-spreadsheet'
import { BeatLoader } from 'react-spinners'
import { Clipboard } from 'lucide-react';
type Props = {
    items: any,
    setItems: React.Dispatch<React.SetStateAction<Detail[]>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPasteSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

type Detail = { id: number, productId: number, proName: string, unit: string, materialWeight: number, price: number, isOpen: boolean }
export default function PasteData(props: Props) {
    props.setPasteSuccess(false);
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
        // let rs = valueText.split('\n')
        //     .filter((line: any) => line.trim() !== '')
        //     .map((line: any, index: number) => {
        //         const [id, productName, unit, materialWeight, price] = line.split("\t");
        //         if (!id || !productName || !unit || !materialWeight || !price) {
        //             setError("Form bảng không hợp lệ (copy từ stt kéo xuống)")
        //             flag = true;
        //             console.log(error)
        //             return;
        //         }
        //         return {
        //             id: uniqueCode++,
        //             productId: null,
        //             proName: productName.trim(),
        //             unit: unit,
        //             materialWeight: parseFloat(materialWeight.replace(",", ".")),
        //             price: numberWithoutDots(price),
        //             isOpen: false
        //         };
        //     });
        // console.log(rs);
        const rs = data.map((items: any[]) => {
            // if (items.some(item => item.value === undefined)) {
            //     return;
            // }
            if (!items[0] || !items[0].value|| !items[1] || !items[1].value || !items[2] || !items[2].value) {
                return;
            }
            console.log(items)
            let materialWeight = parseFloat(items[2].value.replace(",", "."))
            if (isNaN(materialWeight)) {
                setError("Khối lượng không phải số");
                flag = true;
                return;
            }
            return {
                id: uniqueCode++,
                productId: null,
                proName: items[0].value.trim(),
                unit: items[1].value,
                materialWeight: materialWeight,
                price: items[3].value ? numberWithoutDots(items[3].value) : null,
                isOpen: false
            }
        })
        console.log(rs);
        if (!rs || !rs[0]) {
            setError("Không Hợp Lệ")
            setLoading(false);
            return;
        }
        console.log(error)
        if (!flag) {
            const promises = rs.map(async (item: any) => {
                if (item) {
                    let url = process.env.NEXT_PUBLIC_API_URL + "/api/product/find-cus/" + item.proName;
                    const response = await GetPatternMinh(url, {});
                    console.log(response);
                    if (!response) {
                        setError("Lỗi không tìm thấy product: " + item.proName)
                        flag = true
                        return null;
                    }
                    if (item.price) {
                        return { ...item, productId: response.id }
                    }
                    else{
                        return {...item,productId:response.id,price:response.price}
                    }
                }
            })
            if (!flag) {
                let updateData: Detail[] = await Promise.all(promises);
                const temp = props.items;
                updateData.map((item: Detail) => {
                    if (item) {
                        temp.push(item);
                    }
                })
                props.setItems(temp);
                console.log(props.items);
                props.setPasteSuccess(true);
                props.setOpen(false);
            }
        }
        setLoading(false);

    }
    const columnLabels = ["Tên Vật Tư", "Đơn vị", "Khối Lượng", "Đơn giá"];
    const [data, setData] = useState<Matrix<never>>([[]]);
    const handleDataChange = (newData: Matrix<never>) => {
        console.log(newData);
        setData(newData);
    };
    const handlePast = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();

            if (/^[\p{L}\p{N}\s\.,!?]+$/u.test(clipboardText)) {
                let rs: any;
                rs = clipboardText.split('\n').filter((line: any) => line.trim() !== '')
                    .map((line: any, index: number) => {
                        let arr = line.split("\t");
                        return [{ value: arr[0] }, { value: arr[1] }, { value: arr[2] }, { value: arr[3] }];
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
{/* <textarea
                className={`${error ? 'border-red-500' : 'border-gray-300'} w-full min-h-40 h-auto border-2 rounded-lg p-2 `}
                placeholder="Dán vào đây (copy từ số thứ tự)"
                onChange={(e) => handleTextArea(e.target.value)}
            ></textarea> */}