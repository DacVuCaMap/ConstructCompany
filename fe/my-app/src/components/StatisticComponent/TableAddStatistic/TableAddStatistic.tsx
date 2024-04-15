
import OpenWindowStatisticPro from '@/components/InvoiceComponents/OpenWindowSearchCus/OpenWindowStatisticPro';
import { formatNumberToDot, formatNumberWithDot, numberWithoutDots } from '@/data/listData';
import React, { useEffect, useState } from 'react'
import './TableAddStatistic.css'
type StatisticItem = {
    id: number, day: string, licensePlate: string
    , trailer: string, ticket: string, proName: string, proId: number, unit: string, price: number
    , materialWeight: number, note: string
}
type ParentStatisticItem = { proName: string, proUnit: string, proPrice: number, proId: number, statisticItems: StatisticItem[] }
type Props = {
    setTotalAmount: React.Dispatch<React.SetStateAction<any>>,
    setStatisticDetails: React.Dispatch<React.SetStateAction<any>>
}
export default function TableAddStatistic(props: Props) {

    // khai bao state
    const [openWindowPro, setOpenWindowPro] = useState(false);
    const [items, setItems] = useState<ParentStatisticItem[]>([]);
    let maxDay = '';
    let minDay = '';
    // const [totalWeight,setTotalWeight] = useState<number[]>([]);
    // const [totalCost,setTotalCost] = useState<number[]>([]);

    // all handle function
    const handleInputChange = (e: any, index: number, childId: number, key: any) => {
        let { value } = e.target;
        if (key === "price") {
            value = numberWithoutDots(value);
        }
        if (key === 'day') {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            value = `${year}-${month}-${day}`;
        }
        const updatedItems = [...items];
        const updatedParentItem = { ...updatedItems[index] };
        updatedParentItem.statisticItems = updatedParentItem.statisticItems.map((item: StatisticItem) =>
            item.id === childId ? { ...item, [key]: value } : item
        );
        updatedItems[index] = updatedParentItem;

        setItems(updatedItems);
    };
    const handleInputProduct = (pro: any) => {
        const exists = items.some(item => item.proId === pro.id);
        if (exists) {
            return exists;
        }
        //add product
        const item: ParentStatisticItem = {
            proName: pro.proName, proId: pro.id, proUnit: pro.unit, proPrice: pro.price, statisticItems: []
        }
        setItems([...items, item]);
        return false;
    }
    const handleItemDelRow = (index: number, childId: number) => {
        const updatedItems = [...items];
        const updatedChildItem = { ...updatedItems[index] };
        updatedChildItem.statisticItems = updatedChildItem.statisticItems.filter((item => item.id !== childId));
        updatedItems[index] = updatedChildItem;
        setItems(updatedItems);
    }
    const addChildItem = (index: number) => {

        const parentItem = items[index];
        console.log(parentItem)
        let id = genChildId(index);

        const childItem: StatisticItem = {
            id: id, day: '', licensePlate: ''
            , trailer: '', ticket: '', proName: parentItem.proName, proId: parentItem.proId
            , unit: parentItem.proUnit, price: parentItem.proPrice
            , materialWeight: 0, note: ''
        }
        parentItem.statisticItems.push(childItem);
        const updateItem = [...items];
        updateItem[index] = parentItem;
        setItems(updateItem);
    }
    const handleDelParentItem = (proId: number) => {
        if (proId) {
            const updatedItems = items.filter((item) => item.proId !== proId);
            setItems(updatedItems);
        }

    }
    const [childItemId, setChildItemId] = useState<number[]>([]);
    const genChildId = (index: number) => {
        const item = [...childItemId];
        if (!item[index] && item[index] != 0) {
            item[index] = 0;
        }
        else {
            item[index]++;
        }
        setChildItemId(item);
        return item[index];
    };
    let totalWeight: number[] = [];
    let totalCost: number[] = [];
    let weightRs: number = 0;
    let costRs: number = 0
    const TotalMaterialWeight = (index: number) => {
        const total: number = items[index].statisticItems.reduce((total, item) => { return total + Number(item.materialWeight) }, 0)
        const arrWeight = [...totalWeight]
        totalWeight[index] = total;
        // setTotalWeight(arrWeight);
        return total;
    }
    const HandleTotalCost = (index: number) => {
        const total = items[index].statisticItems.reduce((total, item) => { return total + item.price * item.materialWeight }, 0)
        const arr = [...totalCost]
        totalCost[index] = total;
        // setTotalCost(arr);
        return total;
    }
    const HandleTotalAmount = () => {
        const total = totalCost.reduce((total, item) => { return total + item }, 0)
        return total;
    }
    const HandletotalWeight = () => {
        const total = totalWeight.reduce((total, item) => { return total + item }, 0)
        return total;
    }
    //get max min day
    useEffect(() => {
        let total = totalCost.reduce((total, item) => { return total + item }, 0)
        props.setTotalAmount(total);
    }, [items])
    useEffect(() => {
        let arr: StatisticItem[] = [];
        items.map(item => { item.statisticItems.map(it => { arr.push(it) }) });
        props.setStatisticDetails(arr);
    }, [items])
    return (
        <div>
            <h2 className='block text-gray-700 font-bold mb-2'>Bảng số liệu</h2>
            <table border={1} className='w-full table-auto text-sm staTable'>
                <thead className='bg-neutral-900 h-10 text-white'>
                    <tr>
                        <th>STT</th>
                        <th>Ngày</th>
                        <th>Biển xe</th>
                        <th>Rơ moóc</th>
                        <th>Số phiếu</th>
                        <th>Loại Hàng</th>
                        <th>Đơn vị</th>
                        <th>Khối lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Ghi chú</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='border-b border-gray-500'>

                    {items.map((parentItem, index) => (
                        <>
                            {parentItem.statisticItems.map((item: StatisticItem, num) => (
                                <tr key={num} className={`h-7 ${num % 2 === 0 ? 'bg-white' : 'bg-stone-200'} bodyTable `}>
                                    <td>{num + 1}</td>
                                    <td><input required className='h-7 w-full' type="date" value={item.day} onChange={(e) => handleInputChange(e, index, item.id, 'day')} /></td>
                                    <td><input required className='h-7 w-full' type="text" value={item.licensePlate} onChange={(e) => handleInputChange(e, index, item.id, 'licensePlate')} /></td>
                                    <td><input required className='h-7 w-full' type="text" value={item.trailer} onChange={(e) => handleInputChange(e, index, item.id, 'trailer')} /></td>
                                    <td><input required className='h-7 w-full' type="text" value={item.ticket} onChange={(e) => handleInputChange(e, index, item.id, 'ticket')} /></td>



                                    <td className='relative'>
                                        <input required className='h-7 w-full' readOnly={true} type="text" value={parentItem.proName} />
                                        <input type="hidden" value={index} readOnly={true} />
                                    </td>
                                    <td><input required className='h-7 w-full text-center' type="text" value={item.unit} readOnly={true} /></td>
                                    <td><input required className='h-7 w-full' type='number' value={item.materialWeight === 0 ? '' : item.materialWeight} onChange={(e) => handleInputChange(e, index, item.id, 'materialWeight')} /></td>
                                    <td><input
                                        required
                                        className='h-7 w-full'
                                        placeholder='Nhập đơn giá'
                                        type="text"
                                        value={item.price === 0 ? '' : formatNumberToDot(item.price)}
                                        onChange={(e) => handleInputChange(e, index, item.id, 'price')} />
                                    </td>
                                    <td className='text-center'>{formatNumberWithDot((item.materialWeight * item.price), 0)}</td>
                                    <td><input className='h-7 w-full' type="text" value={item.note} onChange={(e) => handleInputChange(e, index, item.id, 'note')} /></td>
                                    <td>
                                        <button type='button' className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleItemDelRow(index, item.id)}>xóa</button>
                                    </td>
                                </tr>

                            ))}
                            <tr key={parentItem.proId} className='bg-yellow-200 text-sm'>
                                <td>{index + 1}</td>
                                <td colSpan={2}><button type='button' className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => addChildItem(index)}>+ Thêm hàng mới</button></td>
                                <td className='text-center' colSpan={4}>{parentItem.proName}</td>
                                <td className='text-center'>{formatNumberToDot(TotalMaterialWeight(index))}</td>
                                <td></td>
                                <td className='text-center \'>{formatNumberToDot(HandleTotalCost(index))}</td>
                                <td></td>
                                <td>
                                    <td>
                                        <button type='button' className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelParentItem(parentItem.proId)}>xóa</button>
                                    </td>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
                <tfoot >
                    <tr>
                        <td colSpan={12} className='text-center' >
                            <button type='button' className="w-full inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setOpenWindowPro(true)}>+ Thêm vật liệu mới</button>
                            {openWindowPro && <OpenWindowStatisticPro setOpenWindowPro={setOpenWindowPro} handleInputProduct={handleInputProduct} />}
                        </td>
                    </tr>
                    <tr className='font-bold'>
                        <td></td>
                        <td colSpan={6} className='text-center'>Tổng phát sinh chi phí </td>
                        <td className='text-center'>{HandletotalWeight() === 0 ? '' : HandletotalWeight()}</td>
                        <td></td>
                        <td>{formatNumberToDot(HandleTotalAmount())}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
