import React, { forwardRef, useEffect, useState } from 'react';
import './PrintInvoice.css'
import { sellerData } from '@/data/data';
import { numberToWords } from '@/data/function';
type Props= {
  data: {
    createAt: Date;
    companyName: string;
    representativeCustomer: string;
    positionCustomer: string;
    orderDetails: any[],
    tax: number,
    contractCode:string,
    totalAmount:number
  },
  componentRef:any
}
export default function PrintInvoice(props:Props) {
  const data =props.data;
  document.body.style.overflow = 'hidden';
    console.log('dataPrint', data);
    const [loading, setLoading] = useState(true);
    const [totalCost, setTotalCost] = useState(0);
    const seller = sellerData;
    let count = 1;
    
    useEffect(() => setLoading(false), [data]);
    const numberWithDots = (number: number, fixed: number) => {
      let num = parseFloat(number.toFixed(fixed));
      return num.toLocaleString('de-DE');
    };
    const handleCalculator = () => {
      return data.orderDetails?.reduce((total, item) => {
        return total + item.materialWeight * item.price;
      }, 0)
    }
    if (loading) {
      return <div>Loading...</div>; // Hiển thị thông báo khi đang tải dữ liệu
    }
    return (
      <div >
        <div ref={props.componentRef} className="a4-sheet lg:block document">
          <div className="invoiceCard invoiceCard-1">
            <span className='font-bold'>CTY TNHH XÂY DỰNG <br /> VÀ THƯƠNG MẠI TIẾN ĐÔNG</span><br />
            <span className='font-light'>Số:{data.contractCode}/BBNT</span>
          </div>
          <div className="invoiceCard invoiceCard-2"><span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span> <br /><span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span></div>
          <div className="invoiceCard invoiceCard-3"><span>BIÊN BẢN NGHIỆM THU VÀ XÁC NHẬN KHỐI LƯỢNG</span> </div>
          <div className="invoiceCard invoiceCard-4"><span>- Căn cứ HĐKT Số: {data.contractCode}/HĐNT/AK-TĐ </span><br />
            <span>Hôm nay, ngày {data.createAt.getDate()} tháng {data.createAt.getMonth()+1} năm {data.createAt.getFullYear()}. Chúng tôi gồm:</span> <br />
            <span style={{ fontWeight: 'bolder' }}>Đại diện bên mua: {data.companyName}</span>
            <br />
            <span className="spanInvoice-card1">Người đại diện: {data.representativeCustomer} </span><span>Chức vụ: {data.positionCustomer}</span><br />
            <span style={{ fontWeight: 'bolder' }}>Đại diện bên bán:{seller.companyName}</span>
            <br />
            <span className="spanInvoice-card1">Người đại diện: {seller.representativeSeller}</span><span>Chức vụ: {seller.positionSeller}</span>
            <br />
            <span>Đã cùng nhau đối chiếu và nghiệm thu xác nhận khối lượng giao nhận cụ thể như sau : </span>
            <table className="custom-table">
              <thead>
                <tr >
                  <th>STT</th>
                  <th>Tên Vật liệu</th>
                  <th>Đơn vị</th>
                  <th>Khối Lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {data.orderDetails.map((item) => (
                  <tr key={count}>
                    <td>{count++}</td>
                    <td>{item.proName}</td>
                    <td className='text-center'>{item.unit}</td>
                    <td className='text-center w-1/12'>{item.materialWeight}</td>
                    <td className='text-right'>{numberWithDots(item.price, 2)}</td>
                    <td className='text-right'>{numberWithDots(item.price * item.materialWeight, 0)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className='font-bold'>
                <tr>
                  <td colSpan={5} className='text-left pl-4'>Tổng tiền hàng</td>
                  <td className='text-right'>{numberWithDots(handleCalculator(), 0)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className='text-left pl-4'>Thuế GTGT {data.tax*100}%</td>
                  <td className='text-right'>{numberWithDots(handleCalculator() * data.tax, 0)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className='text-left pl-4'>Tổng thành tiền</td>
                  <td className='text-right'>{numberWithDots(handleCalculator() * (1 + data.tax), 0)}</td>
                </tr>
              </tfoot>
            </table>
            <p className='text-center'>( Bằng chữ: {numberToWords(data.totalAmount)} )</p>
            <span> - Hai bên đồng ý nghiệm thu khối lượng công việc thực hiện trên.</span>
            <br />
            <span>- Bên mua có trách nhiệm thanh toán toàn bộ số tiền trên cho Bên bán theo đúng điều khoản trong hợp đồng. <br />
              - Biên bản được lập thành 02 (hai) bản có giá trị pháp lý như nhau, mỗi bên giữ 01 (một) bản.</span><br />
            <span className='font-bold mr-64 ml-20'>ĐẠI DIỆN BÊN MUA</span>
            <span className='font-bold'>ĐẠI DIỆN BÊN MUA</span>
          </div>
        </div>
      </div>

    );
}
