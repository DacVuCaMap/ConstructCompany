"use client"
import postData from '@/ApiPattern/PostPattern'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BeatLoader } from 'react-spinners'
type Props = {
    items: any,
    setItems: React.Dispatch<React.SetStateAction<Detail[]>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPasteSuccess: React.Dispatch<React.SetStateAction<boolean>>
}
type Detail = { id: number, productId: number, proName: string, unit: string, materialWeight: number, price: number, isOpen: boolean }
export default function UploadOrderExcel(props: Props) {
    props.setPasteSuccess(false);
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [itemErr, setItemErr] = useState<String[]>([]);
    const handleFile = (e: any) => {
        setErr("");
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }
    const handleUpload = async () => {
        setLoading(true);
        if (!file) {
            setErr("File trống")
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        let url = process.env.NEXT_PUBLIC_API_URL + "/api/importOrder";
        const response = await postData(url, formData, { "Content-Type": 'multipart/form-data' })
        if (!Array.isArray(response)) {
            setErr("File không hợp lệ");
            setLoading(false);
            return;
        }
        let uniqueCode = Date.now();
        let itemErr: String[] = [];
        let itemTemp = response.map((item: any) => {
            if (!item.product) {
                itemErr.push(item.name);
                return;
            }
            let detail: Detail = {
                id: uniqueCode++,
                productId: item.product,
                proName: item.name,
                unit: item.unit,
                materialWeight: item.materialWeight,
                price: item.product.price,
                isOpen: false
            }
            return detail;
        })
        // console.log(itemTemp);
        if (itemErr.length > 0) {
            let errStr = "Lỗi không tồn tại gồm :" + itemErr.join(", ");
            setErr(errStr);
            setLoading(false);
            return;
        }
        let mergedRs = props.items.concat(itemTemp);
        props.setItems(mergedRs);
        props.setPasteSuccess(true);
        props.setOpen(false);
    }
    return (
        <div>
            {loading ?

                <div className='h-40 w-96 shadow-lg bg-white font-bold flex justify-center items-center'> <BeatLoader color="#000000" /> Loading</div>
                :

                <div className="flex items-center py-4 w-full flex-col space-y-4">
                    {err && <span className='text-red-500'>{err}</span>}
                    <label className="flex flex-col items-center justify-center w-full lg:w-1/2 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300">

                        {file ?
                            <label htmlFor='file-upload' className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-green-200 hover:bg-green-300 border-green-300">
                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-10 h-10 mb-3 text-gray-400 lucide lucide-folder-check"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                                        <path d="m9 13 2 2 4-4" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 truncate">
                                        <span className="font-semibold">File đã chọn: </span> {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">Nhấn để chọn lại</p>
                                </div>
                            </label>

                            :
                            <label htmlFor='file-upload' className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 truncate">
                                        <span className="font-semibold">Nhấn vào đây để chọn file</span> hoặc kéo thả
                                    </p>
                                    <p className="text-xs text-gray-500">file excel.xlsx</p>
                                </div>
                            </label>

                        }
                        <input id="file-upload" name="file-upload" accept='.xlsx' type="file" className="hidden" onChange={(e) => handleFile(e)} />
                    </label>
                    <button onClick={handleUpload} type='button' className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full'>Confirm</button>
                </div>
            }
        </div>
    )
}
