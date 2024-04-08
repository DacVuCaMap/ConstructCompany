"use client"
import React, { useState } from 'react'

export default function TableOrder() {
    const [items, setItems] = useState([
        { id: 1, name: '', unit: '', quantity: 0, price: 0 },
    ]);
    let count = 1;
    const [countItemId,setCountItemId]=useState<number>(2);
    // Hàm thêm hàng mới
    const handleAddRow = () => {
        setCountItemId(countItemId+1);
        const newItem = {
            id: countItemId,
            name: '',
            unit: '',
            quantity: 0,
            price: 0
        };
        setItems([...items, newItem]);
    };
    const handledelRow = (id: number) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    }
    const handleInputChange = (e: any, id: any, key: any) => {
        const { value } = e.target;
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        );
        setItems(updatedItems);
    };
    const calculateTotal = () => {
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };
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

                            {items.map((item,index) => (
                                <tr key={item.id} className={`h-7 ${count % 2 != 0 ? 'bg-white' : 'bg-stone-200'}`}>
                                    <td>{count++}</td>
                                    <td><input required className='h-7 w-full' placeholder='Nhập tên' type="text" value={item.name} onChange={(e) => handleInputChange(e, item.id, 'name')} /></td>
                                    <td><input required className='h-7 w-full' placeholder='Nhập đơn vị' type="text" value={item.unit} onChange={(e) => handleInputChange(e, item.id, 'unit')} /></td>
                                    <td><input required className='h-7 w-full' placeholder='Nhập Khối lượng' value={item.quantity === 0 ? '' : item.quantity} step="0.01" onChange={(e) => handleInputChange(e, item.id, 'quantity')} /></td>
                                    <td><input required className='h-7 w-full' placeholder='Nhập đơn giá' type="number" value={item.price === 0 ? '' : item.price} onChange={(e) => handleInputChange(e, item.id, 'price')} /></td>
                                    <td className='text-center'>{item.quantity * item.price}</td>
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
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={5}>Tổng cộng:</td>
                                <td className='text-center font-bold'>{calculateTotal()}</td>
                            </tr>
                        </tfoot>
                    </table>
    </div>
  )
}
