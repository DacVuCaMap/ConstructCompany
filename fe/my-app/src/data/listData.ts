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

            return !value ? 0 : formatNumberWithDot(value,0) ;
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
    { field: 'proName', headerName: "Name", flex: 1.5 },
    { field: 'inventory', headerName: "Inventory", flex: 1 },
    { field: 'unit', headerName: "Unit", flex: 1 },
    { field: 'price', headerName: "Price", flex: 1 },
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
    { field: 'id' ,headerName:"ID",flex:0.2},
    { field: 'orderCode', headerName: "Order Code", flex: 0.5 },
    { field: 'customer', headerName: "Tên Công ty (khách hàng)", flex: 1.5 ,valueGetter:(value:any)=>{
        return value.companyName
    }},
    { field: 'totalAmount', headerName: "Total Amount", flex: 1,valueGetter:(value:number)=>{
        return formatNumberWithDot(value,0)
    } },
    { field: 'isPaymented', headerName: "Thanh Toán", flex: 1 , valueGetter:(value:boolean)=>{
        return !value ? 'Chưa Thanh Toán' : 'Hoàn Thành'
    }},
    { field: 'createAt', headerName: "Create At", flex: 1 ,valueGetter: (value: string) => {
        return formatDateData(value)}},
]

const formatDateData = (dateString: string) => {
    if (!dateString) {
        return;
    }
    const parts = dateString.substring(0, 10).split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
}
const formatNumberWithDot = (number: number, fixed: number) => {
    let num = parseFloat(number.toFixed(fixed));
    return num.toLocaleString('de-DE');
};