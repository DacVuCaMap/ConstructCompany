import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './PrintPayment.css'
import { sellerData } from '@/data/data';
import { numberToWords } from '@/data/function';
import { formatNumberToDot } from '@/data/listData';
type Props = {
    data: any
}
const PrintComponent = (props: Props) => {
    const componentRef = useRef(null);
    console.log(props.data);
    const today = new Date(props.data.createAt);
    const signingDate = new Date(props.data.signingDate);
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="z-99 absolute top-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export PDF
                </button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} className="a4-sheet lg:block document">
                <div className="card-child cardb-1">
                    --------o0o--------
                </div>
                <div className="card-child cardb-2"><span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span> <br /><span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span></div>
                <div className="card-child cardb-3"><span>GIẤY ĐỀ NGHỊ THANH TOÁN</span> </div>
                <div className='card-child cardb-12 text-right'>Hà Nội, ngày {today.getDate()} tháng {today.getMonth()+1} năm  {today.getFullYear()}</div>
                <span className='card-child cardb-34'>Hạng mục: &#34;Thi công Trục đường Âu Cơ, phường Tứ Liêm, quận Tây Hồ, Tp. Hà Nội&#34;</span>
                <div className="card-child cardb-4">
                    <span className='font-bold'><span className='underline'>Kính gửi:</span> {props.data.customer.companyName} </span><br />
                    <span>  - Căn cứ hợp đồng nguyên tắc {props.data.contractCode} /HĐNT/AK-TĐ  - Ký ngày {signingDate.getDate()} tháng {signingDate.getMonth()} năm {signingDate.getFullYear()} giữa {sellerData.companyName} và {props.data.customer.companyName}</span> <br />
                    <span>- Căn cứ Bảng xác nhận giá trị khối lượng công việc hoàn thành.</span>
                    <br />
                    <span>  - Công ty TNHH Xây dựng và thương mại Tiến Đông đề nghị {props.data.customer.companyName} thanh toán khối
                        lượng hoàn thành cho chúng tôi như sau:</span>
                    <br />
                    <span className='span-cardb1'>
                        1. Giá trị khối lượng hoàn thành: <br />
                        2. Đã tạm ứng: <br />
                        3. Giá trị đề nghị thanh toán:</span>
                    <span className='span-cardb2'>
                        <span className='font-bold'>{formatNumberToDot(props.data.totalAmount)} Đồng</span><br />
                        <span className='font-bold'>0 Đồng</span><br />
                        <span className='font-bold'>{formatNumberToDot(props.data.totalAmount)} Đồng</span></span>
                    <div style={{ height: '80px' }}></div>
                    <p className='span-cardb4 font-bold'>(Bằng chữ:   {numberToWords(props.data.totalAmount)}./.)</p>
                    <span>Toàn bộ số tiền trên xin chuyển vào tài khoản Ngân hàng của chúng tôi:</span>
                    <br />
                    <span>- Tên tài khoản: <span className='font-bold'>{sellerData.accountBankName}</span></span>
                    <br />
                    <span>- Số tài khoản ngân hàng: <span className='font-bold'>{sellerData.accountBankNumber}</span></span>
                    <br />
                    <span>- Tên ngân hàng:  <span className='font-bold'>{sellerData.accountBankNumber}</span>  </span>
                    <br />
                    <span className='ml-28 font-bold'>Xin trân trọng cảm ơn!</span>
                    <br />
                    <span className='underline font-bold'> Nơi Nhận: </span>
                    <br />
                    <div className='ml-28'>

                        <span className='mr-64'>- Như trên:</span>
                        <span className='font-bold'>CÔNG TY TIẾN ĐÔNG</span>
                        <br />
                        <span>- Lưu PKH</span>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default PrintComponent;