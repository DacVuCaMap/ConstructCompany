import { GridColDef, GridRenderCellParams, GridValueGetter } from "@mui/x-data-grid";
export const columnCus: GridColDef[] = [
    {
        field: 'id',
        headerName: "ID",
        flex: 0.5
    }
    ,
    {
        field: 'taxCode',
        headerName: "Mã số thuế",
        flex: 0.5
    }
    ,
    {
        field: 'companyName',
        headerName: "Công ty",
        flex: 2
    },
    // {
    //     field: 'debt',
    //     headerName: "Chưa thanh toán",
    //     flex: 1,
    //     valueGetter: (value: number) => {

    //         return !value ? 0 : formatNumberWithDot(value, 0);
    //     }
    // },
    {
        field: 'address',
        headerName: "Địa chỉ",
        flex: 1
    },
    {
        field: 'createAt',
        headerName: "Ngày tạo",
        flex: 1,
        valueGetter: (value: string) => {
            return formatDateData(value);
        }
    }
]
export const columnProduct: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.5 },
    { field: 'proName', headerName: "Tên vật liệu", flex: 1.5 },
    { field: 'inventory', headerName: "Tồn kho", flex: 1 },
    { field: 'unit', headerName: "Đơn vị", flex: 1 },
    {
        field: 'price', headerName: "Giá bán", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 2);
        }
    },
    {
        field: 'importPrice', headerName: "Giá nhập", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 2);
        }
    },
    {
        field: 'createAt', headerName: "Ngày tạo", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value);
        }
    },
    {
        field: 'updateAt', headerName: "Cập nhập", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value);
        }
    }
];

export const columnOrder: GridColDef[] = [
    { field: 'id' },
    { field: 'contractCode', headerName: "Mã biên bản", flex: 0.5 },
    {
        field: 'customer', headerName: "Khách hàng", flex: 1, valueGetter: (value: any) => {
            return value.companyName;
        }
    },
    {
        field: 'totalAmount', headerName: "Tổng Thành tiền", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 0)
        }
    },
    // {
    //     field:'s',headerName: "Tiền đã thanh toán", flex: 1, valueGetter: (value, row) => {
    //         const rs = row.totalAmount - row.leftAmount;
    //         return formatNumberWithDot(rs, 0)
    //     }
    // },
    {
        field: 'leftAmount', headerName: "Chưa Thanh Toán", flex: 1, valueGetter: (value) => {
            return formatNumberWithDot(value, 0)
        }
    },
    {
        field: 'isPaymented', headerName: "Trạng thái thanh toán", flex: 1, valueGetter: (value: boolean) => {
            return !value ? 'Chưa hoàn thành' : 'Hoàn Thành'
        }
    },
    {
        field: 'createAt', headerName: "Ngày tạo", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value)
        }
    },
]
export const columnPayment: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.2 },
    { field: 'contractCode', headerName: "Mã biên bản", flex: 1 },
    {
        field: 'totalAmount', headerName: "Tổng Thành tiền", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 0)
        }
    },
    {
        field: 'leftAmount', headerName: "Đã Thanh Toán", flex: 1, valueGetter: (value,row:any) => {
            return formatNumberWithDot(row.totalAmount-value, 0);
        }
    },
    // {
    //     field: 'isPaymented', headerName: "Trạng thái", flex: 1, valueGetter: (value: boolean) => {
    //         return !value ? 'Chưa hoàn thành' : 'Hoàn Thành'
    //     }
    // },
    {
        field: 'createAt', headerName: "Ngày tạo", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value)
        }
    },
]
export const columnQLCN: GridColDef[] = [
    {
        field: 'id', headerName: "ID", flex: 0.2, valueGetter: (value: any, row: any) => {
            value = row.customer.id;
            return row.customer.id;
        }
    },
    {
        field: "taxCode", headerName: "Mã số thuế", flex: 1, valueGetter: (value: any, row: any) => {
            return row.customer.taxCode;
        }
    },
    {
        field: "company", headerName: "Tên Công Ty", flex: 1, valueGetter: (value: any, row: any) => {
            return row.customer.companyName;
        }
    },
    { field: "orderCount", headerName: "Số lượng", flex: 0.5, align: "center" },
    {
        field: "payDebt", headerName: "Chưa thanh toán(vnd)", flex: 1, valueGetter: (value: any,row:any) => {
            return formatNumberToDot(row.customer.payDebt);
        }
    },
    // {
    //     field: "status", headerName: "Trạng thái", flex: 1, valueGetter: (value: any, row: any) => {
    //         return row.totalLeftAmount === 0 ? "Hoàn thành" : "Chưa Hoàn Thành"
    //     }
    // },
]
export const columnStatistic: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.2 },
    {
        field: 'companyName', headerName: "Tên Công ty (khách hàng)", flex: 1.5
    },
    {
        field: 'totalAmount', headerName: "Total Amount", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 0)
        }
    },
    {
        field: 'createAt', headerName: "Ngày tạo", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value)
        }
    },
    {
        field: 'updateAt', headerName: "Cập nhập", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value)
        }
    }
]
export const columnAccount: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.5 },
    { field: 'email', headerName: "Tên đăng nhập", flex: 1 },
    { field: 'fullName', headerName: "Họ Tên", flex: 1 },
    { field: 'phoneNumber', headerName: "SDT", flex: 1 },
    {
        field: 'createAt', headerName: "Ngày tạo", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value);
        }
    },
    {
        field: 'admin', headerName: "Quyền", flex: 0.5, valueGetter: (value: boolean) => {
            return value ? "ADMIN" : "NHÂN VIÊN";
        }
    }
]
export const formatDateData = (dateString: string) => {
    if (!dateString) {
        return;
    }
    const parts = dateString.substring(0, 10).split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
}
export const formatNumberWithDot = (number: number, fixed: number) => {
    number = Number(number);
    if (number) {
        let num = parseFloat(number.toFixed(fixed));
        return num.toLocaleString('de-DE');
    }
    return 0;
};
export const numberWithoutDots = (numberWithDots: string) => { return parseFloat(numberWithDots.replace(/\./g, '')) };
export const formatNumberToDot = (number: any) => {
    if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return 0;
}
export function convertDay(isoDate: string): string {
    // Tạo một đối tượng Date từ chuỗi ISO 8601
    var date = new Date(isoDate);

    // Lấy các thành phần ngày, tháng và năm
    var ngay = date.getDate().toString();
    var thang = (date.getMonth() + 1).toString(); // Tháng bắt đầu từ 0 nên cần +1
    var nam = date.getFullYear().toString();

    // Đảm bảo ngày và tháng có hai chữ số
    if (ngay.length === 1) {
        ngay = '0' + ngay;
    }
    if (thang.length === 1) {
        thang = '0' + thang;
    }

    // Trả về ngày ở định dạng dd-MM-yyyy
    return ngay + '-' + thang + '-' + nam;
}