"use client"
import React, { useEffect, useState } from 'react'
import OpenWindowPro from '../OpenWindowSearchCus/OpenWindowPro'
type Detail = { id: number, productId: number, proName: string, unit: string, materialWeight: number, price: number, isOpen: boolean }
type Cost = { totalCost: number, tax: number, totalAmount: number }
type Props = {
    setOrderDetail: React.Dispatch<React.SetStateAction<Detail[]>>,
    setCost: React.Dispatch<React.SetStateAction<Cost>>,
    cost: Cost
}

export default function TableOrder(props: Props) {
    const [items, setItems] = useState<Detail[]>([
        { id: 1, productId: -1, proName: '', unit: '', materialWeight: 0, price: 0, isOpen: false },
    ]);
    const [product, setProduct] = useState<any>(null);
    let count = 1;
    const [countItemId, setCountItemId] = useState<number>(2);
    // Hàm thêm hàng mới
    const handleAddRow = () => {
        setCountItemId(countItemId + 1);
        const newItem: Detail = {
            id: countItemId,
            productId: -1,
            proName: '',
            unit: '',
            materialWeight: 0,
            price: 0,
            isOpen: false
        };
        setItems([...items, newItem]);
    };
    const handledelRow = (id: number) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    }
    const handleInputNameChange = (e: any, id: any, key: any) => {
        const { value } = e.target;
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [key]: value, isOpen: true } : item
        );
        setItems(updatedItems);
    };
    const handlePriceChange = (e: any, id: any, key: any) => {
        const { value } = e.target;
        const formatedPrice = value.replace(/\./g, '');
        const updatedItems = items.map((item: Detail) =>
            item.id === id ? { ...item, [key]: formatedPrice } : item
        );
        setItems(updatedItems);
    }
    const handleInputChange = (e: any, id: any, key: any) => {
        let { value } = e.target;
        if (key === "price" || key === "materialWeight") {
            value = Number(value);
        }
        const updatedItems = items.map((item: Detail) =>
            item.id === id ? { ...item, [key]: value } : item
        );
        setItems(updatedItems);
    };
    const calculateCost = () => {
        props.cost.totalCost = items.reduce((total, item) => {
            return total + item.materialWeight * item.price;
        }, 0);
        return numberWithDots(props.cost.totalCost, 0);
    };
    const changeTax = (value: any) => {
        let val: number = parseFloat(value) / 100;
        if (val > 1) {
            return;
        }
        props.setCost({ ...props.cost, tax: val });
    }
    const handleCloseWindow = () => {
        const closeWindowItem = items.map((item) => ({ ...item, isOpen: false }));
        setItems(closeWindowItem);
    }
    useEffect(() => {
        console.log('eff1');
        props.setOrderDetail(items);
    }, [items])
    //set product
    useEffect(() => {
        console.log('eff2')
        if (product) {
            const updatedItems = items.map(item =>
                item.id === product.itemId ? { ...item, unit: product.unit, price: product.price, productId: product.productId, proName: product.proName, isOpen: false } : item
            );
            setItems(updatedItems)
        }
    }, [product])
    const numberWithDots = (number: number, fixed: number) => {
        let num = parseFloat(number.toFixed(fixed));
        return num.toLocaleString('de-DE');
    };
    const  formatNumber= (number:any)=> {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } 
    useEffect(() => {
        console.log('eff3')
        props.setCost({ totalCost: props.cost.totalCost, tax: props.cost.tax, totalAmount: props.cost.totalCost+(props.cost.totalCost * props.cost.tax) })
    }, [items])
    return (
        <div>
            <h2 className='block text-gray-700 font-bold mb-2'>Bảng số liệu</h2>
            <table border={1} className='w-full table-auto text-sm '>
                <thead className='bg-neutral-900 h-10 text-white'>
                    <tr>
                        <th>STT</th>
                        <th>Tên vật tư</th>
                        <th>Đơn vị</th>
                        <th>Khối lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='border-b border-gray-500'>

                    {items.map((item, index) => (
                        <tr key={item.id} className={`h-7 ${count % 2 != 0 ? 'bg-white' : 'bg-stone-200'}`}>
                            <td>{count++}</td>
                            <td className='relative'>
                                <input required className='h-7 w-full' placeholder='Nhập tên' type="text" value={item.proName !== undefined ? item.proName : ''} onChange={(e) => handleInputNameChange(e, item.id, 'proName')} />
                                <input type="hidden" value={item.productId !== undefined || item.productId === -1 ? item.productId : ''} />
                                {item.isOpen && <OpenWindowPro setProduct={setProduct} str={item.proName} itemId={item.id} handleClose={handleCloseWindow} />}
                                {item.productId === -1 ? <p className="text-red-500 text-xs italic">Vật tư không hợp lệ</p> : ''}
                            </td>
                            <td><input required className='h-7 w-full' placeholder='Nhập đơn vị' type="text" value={item.unit} onChange={(e) => handleInputChange(e, item.id, 'unit')} /></td>
                            <td><input required className='h-7 w-full' placeholder='Nhập Khối lượng' type='number' value={item.materialWeight === 0 ? '' : item.materialWeight} step="0.01" onChange={(e) => handleInputChange(e, item.id, 'materialWeight')} /></td>
                            <td><input
                                required
                                className='h-7 w-full'
                                placeholder='Nhập đơn giá'
                                type="text"
                                value={item.price === 0 ? '' : formatNumber(item.price)}
                                onChange={(e) => handlePriceChange(e, item.id, 'price')} />
                            </td>
                            <td className='text-center'>{numberWithDots((item.materialWeight * item.price), 0)}</td>
                            <td>
                                <button type='button' className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handledelRow(item.id)}>xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} className='text-center' >
                            <button type='button' className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddRow}>+ Thêm hàng mới</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>Tổng tiền hàng:</td>
                        <td className='text-center font-bold'>{calculateCost()}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            Thuế GTGT{" "}
                            <input
                                className="inline-block w-12 py-1 px-2 border border-gray-300 appearance-none"
                                type="number"
                                value={props.cost.tax * 100}
                                onChange={(e) => changeTax(e.target.value)}
                            />
                            %
                        </td>
                        <td className='text-center font-bold'>{numberWithDots(props.cost.tax*props.cost.totalCost,2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={5}>Tổng Thành Tiền:</td>
                        <td className='text-center font-bold'> {numberWithDots(props.cost.totalAmount, 2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
