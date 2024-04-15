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
    {
        field: 'debt',
        headerName: "Chưa thanh toán",
        flex: 1,
        valueGetter: (value: number) => {

            return !value ? 0 : formatNumberWithDot(value, 0);
        }
    },
    {
        field: 'address',
        headerName: "Địa chỉ",
        flex: 1
    },
    {
        field: 'createAt',
        headerName: "Create At",
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
        field: 'createAt', headerName: "Create At", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value);
        }
    },
    {
        field: 'updateAt', headerName: "Update At", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value);
        }
    }
];

export const columnOrder: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.2 },
    { field: 'orderCode', headerName: "Order Code", flex: 0.5 },
    {
        field: 'customer', headerName: "Tên Công ty (khách hàng)", flex: 1.5, valueGetter: (value: any) => {
            return value.companyName
        }
    },
    {
        field: 'totalAmount', headerName: "Total Amount", flex: 1, valueGetter: (value: number) => {
            return formatNumberWithDot(value, 0)
        }
    },
    {
        field: 'isPaymented', headerName: "Thanh Toán", flex: 1, valueGetter: (value: boolean) => {
            return !value ? 'Chưa Thanh Toán' : 'Hoàn Thành'
        }
    },
    {
        field: 'createAt', headerName: "Create At", flex: 1, valueGetter: (value: string) => {
            return formatDateData(value)
        }
    },
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
};
export const numberWithoutDots = (numberWithDots: string) => { return parseFloat(numberWithDots.replace(/\./g, '')) };
export const  formatNumberToDot= (number:any)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} 