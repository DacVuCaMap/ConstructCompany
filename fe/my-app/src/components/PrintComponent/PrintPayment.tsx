import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './PrintPayment.css'
import { sellerData } from '@/data/data';
import { numberToWords } from '@/data/function';
import { formatNumberToDot } from '@/data/listData';
import ExportToWord from './ExportToWord';
type Props = {
    data: any
}
const PrintComponent = (props: Props) => {
    const componentRef = useRef(null);
    console.log(props.data);
    const today = new Date(props.data.createAt);
    const signingDate = new Date(props.data.signingDate);
    const left = props.data.leftAmount ? props.data.leftAmount : 0;
    const exportToWord = () => {
        const htmlContent = document.querySelector('.document');
        const styles = Array.from(document.styleSheets)
            .map((sheet) => {
                try {
                    return Array.from(sheet.cssRules).map((rule) => rule.cssText).join('');
                } catch (e) {
                    console.error('Error reading CSS rules:', e);
                    return '';
                }
            })  
            .join('');
        const cssStyle = `
            .document {
                background-color: white;
                width: 794px;
                min-height: 1123px;
                font-family: 'Times New Roman', Times, serif;
            }`;
            ExportToWord(htmlContent,styles,cssStyle);

    }
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="z-99 fixed top-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export PDF
                </button>}
                content={() => componentRef.current}
            />
            <button type='button' className='fixed z-99 top-10 left-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={exportToWord}>Export to Word</button>
            <div ref={componentRef} className="pt-10 overflow-auto document">
                <table className=' w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className=''>
                            <td colSpan={2} className='text-center'>
                                <div className="font-bold">
                                    <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </span>
                                    <br />
                                    <span className='underline decoration-solid'>Độc lập - Tự do - Hạnh phúc</span>
                                    <br />
                                    <span>--------o0o--------</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div className='text-right mr-10'>Hà Nội, ngày {today.getDate()} tháng {today.getMonth() + 1} năm  {today.getFullYear()}</div>
                            </td>
                        </tr>
                        <tr className=''>
                            <td colSpan={2}>
                                <div className="text-center font-bold pt-8 text-lg">
                                    <span>BIÊN BẢN NGHIỆM THU VÀ XÁC NHẬN KHỐI LƯỢNG</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='text-center'>
                                <span className='font-bold'>Hạng mục: &#34;Thi công Trục đường Âu Cơ, phường Tứ Liêm, quận Tây Hồ, Tp. Hà Nội&#34;</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className=''>
                                <span className='font-bold ml-20'><span className='underline'>Kính gửi:</span> {props.data.customer.companyName} </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='ml-10 mr-10'>
                                    <span>  - Căn cứ hợp đồng nguyên tắc {props.data.contractCode} /HĐNT/AK-TĐ  - Ký ngày {signingDate.getDate()} tháng {signingDate.getMonth() + 1} năm {signingDate.getFullYear()} giữa {sellerData.companyName} và {props.data.customer.companyName}</span> <br />
                                    <span>- Căn cứ Bảng xác nhận giá trị khối lượng công việc hoàn thành.</span>
                                    <br />
                                    <span>  - Công ty TNHH Xây dựng và thương mại Tiến Đông đề nghị {props.data.customer.companyName} thanh toán khối
                                        lượng hoàn thành cho chúng tôi như sau:</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pl-10'>
                                <span>
                                    1. Giá trị khối lượng hoàn thành: <br />
                                    2. Giá trị đã thanh toán: <br />
                                    3. Giá trị đề nghị thanh toán:
                                </span>
                            </td>
                            <td>
                                <div className='ml-10'>
                                    <span className=''>
                                        <span className='font-bold'>{formatNumberToDot(props.data.totalAmount)} </span>Đồng<br />
                                        <span className='font-bold'>{formatNumberToDot(props.data.totalAmount - left)} </span>Đồng<br />
                                        <span className='font-bold'>{formatNumberToDot(props.data.leftAmount)} </span>Đồng
                                    </span>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='ml-10'>
                                    <p className='font-bold text-center text-red-600'>(Bằng chữ:   {numberToWords(props.data.leftAmount)}.)</p>
                                    <span>Toàn bộ số tiền trên xin chuyển vào tài khoản Ngân hàng của chúng tôi:</span>
                                    <br />
                                    <span>- Tên tài khoản: <span className='font-bold'>{sellerData.accountBankName}</span></span>
                                    <br />
                                    <span>- Số tài khoản ngân hàng: <span className='font-bold'>{sellerData.accountBankNumber}</span></span>
                                    <br />
                                    <span>- Tên ngân hàng:  <span className='font-bold'>{sellerData.bankName}</span>  </span>
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
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrintComponent;