import GetPattern from '@/ApiPattern/GetPattern'
import React, { useEffect, useState } from 'react'
import LoadingScene from '../LoadingScene'
type Props = {
    setDataAdd: React.Dispatch<React.SetStateAction<any>>,
    dataAdd:AddType
}
type AddType = {
    order: any,
    endDay: Date | null,
    startDay: Date | null,

}
export default function SearchOrder(props: Props) {
    //first loading
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([]);
    const [searchOrder, setSearchOrder] = useState(false);
    const [inp, setInp] = useState("");
    const [show,setShow] = useState(false);
    let url = process.env.NEXT_PUBLIC_API_URL + "/api/order/list?page=0&size=7&search="
    useEffect(() => {
        
        const fetch = async (str: string) => {
            try {
                const response = await GetPattern(url + inp, {});
                console.log(response);
                setData(response.content);
            } catch (error) {
                console.log(error);
                return;
            }
        }
        fetch(inp);
        setLoading(false);
    }, [inp])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.open-window-order')) {
                setSearchOrder(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
    }, [searchOrder]);
    const handleChange = async (value: string) => {
        setLoading(true);
        setSearchOrder(true)
        setInp(value);
        try {
            const response = await GetPattern(url + inp, {});
            console.log(response);
            setData(response.content);
        } catch (error) {
            console.log(error);
            return;
        }
        setLoading(false);
    }
    const handleClick=(item:any)=>{
        props.setDataAdd({...props.dataAdd,order:item})
        setInp(item.customer.companyName)
        setShow(true);
        setSearchOrder(false);
    }
    return (
        <div className='relative'>
            <label
                className="block text-gray-700 font-bold my-2"
            >
                BBNT và XNKL
            </label><input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="k"
                type="text"
                placeholder='nhập tên khách hàng hoặc mã biên bản'
                required
                value={inp}
                onChange={(e) => handleChange(e.target.value)}
            />
            {show && <h2 className='text-center text-gray-400 font-bold'>Mã bb:{props.dataAdd.order.contractCode} | Tên Công Ty: {props.dataAdd.order.customer.companyName}</h2 >}
            {searchOrder && <div className='absolute w-full bg-gray-200 h-96 open-window-order'>
                {loading ? <LoadingScene /> : <table className='w-full text-center'>
                    <thead>
                        <th>Mã BB</th>
                        <th>Khách Hàng</th>
                        <th>Tổng Thành tiền</th>
                        <th>Còn lại</th>
                    </thead>
                    <tbody>
                        {data.map((item: any, index) => (
                            <tr onClick={()=>handleClick(item)} key={index} className='border-b hover:bg-gray-400 hover:cursor-pointer h-10'>
                                <td>{item.contractCode}</td>
                                <td>{item.customer.companyName}</td>
                                <td>{item.totalCost}</td>
                                <td>{item.leftAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>}
        </div>

    )
}
