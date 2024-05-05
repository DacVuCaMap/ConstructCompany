import React from 'react'
type Props = {
    items: any,
    setItem: React.Dispatch<React.SetStateAction<Detail[]>>
}
type Detail = { id: number, productId: number, proName: string, unit: string, materialWeight: number, price: number, isOpen: boolean }
export default function PasteData() {
    const handleTextArea = (val:any) =>{
        let rs = val.split('\n')
        .filter((line:any) => line.trim() !== '')
        .map((line:any,index:number) => {
          const [id, productId, unit, materialWeight, price, total] = line.split(' ');
          return {
            id: index+9999,
            productId,
            proName: productId,
            unit,
            materialWeight: parseFloat(materialWeight),
            price: parseFloat(price),
            isOpen: false
          };
        });
        console.log(rs)
    }
    return (
        <div>
            <textarea
                className="w-full min-h-40 h-auto border-2 border-gray-300 rounded-lg p-2"
                placeholder="Dán vào đây"
                onChange={(e)=>handleTextArea(e.target.value)}
            ></textarea>
            <button>Confirm</button>
        </div>
    )
}
