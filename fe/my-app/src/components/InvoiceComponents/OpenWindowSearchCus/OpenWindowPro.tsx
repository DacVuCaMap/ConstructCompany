import GetPattern from '@/ApiPattern/GetPattern';
import postData from '@/ApiPattern/PostPattern';
import React, { useEffect, useState } from 'react'
type Pro = { productId: string, proName: string, itemId: number,unit:string,price:number }
type Props = {
    setProduct: React.Dispatch<React.SetStateAction<Pro>>,
    str: string,
    itemId: number,
    handleClose: () => void
}
export default function OpenWindowPro(props: Props) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/search?size=5&page=0&name="
    const [listPro, setListPro] = useState<any[]>([]);
    useEffect(() => {
        console.log("key search", props.str)
        const fetchData: any = async () => {
            try {
                const result = await GetPattern(url + props.str, {});
                console.log('result', result)
                setListPro(result.productPage.content);
            } catch (error) {
                setListPro([]);
            }
        };
        fetchData();

    }, [props.str,url]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.open-window-pro')) {
                props.handleClose();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [props]);
    const handleSetPro = (id: string, name: string,unit:string,price:number) => {
        props.setProduct({ productId: id, proName: name, itemId: props.itemId,unit:unit,price:price });
    }
    return (
        <div className='absolute w-full bg-gray-200 z-50'>
            {listPro.length>0 ?
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th style={{ width: '20%' }}>ID</th>
                            <th>Tên </th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listPro.map((item: any) => (
                            <tr onClick={() => handleSetPro(item.id, item.proName,item.unit,item.price)} className="h-10 cursor-pointer hover:bg-gray-400 border-b border-gray-200" key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.proName}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : ''
            }
        </div>
    )
}
