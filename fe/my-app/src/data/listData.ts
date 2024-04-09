import { GridColDef } from "@mui/x-data-grid";

export const columnCus: GridColDef[] = [
    {
        field: 'id',
        headerName: "ID",
        flex: 0.5
    }
    ,
    {
        field: 'taxCode',
        headerName: "Tax Code",
        flex: 1
    }
    ,
    {
        field: 'companyName',
        headerName: "Company Name",
        flex: 1
    },
    {
        field: 'address',
        headerName: "Address",
        flex: 1
    },
    {
        field: 'createAt',
        headerName: "Create At",
        flex: 1.5
    }

]
export const columnProduct: GridColDef[] = [
    { field: 'id', headerName: "ID", flex: 0.5 },
    { field: 'proName', headerName: "Name", flex: 1 },
    { field: 'inventory', headerName: "Inventory", flex: 1 },
    { field: 'unit', headerName: "Unit", flex: 1 },
    { field: 'price', headerName: "Price", flex: 1 },
    { field: 'createAt', headerName: "Create At", flex: 1.5 },
    { field: 'updateAt', headerName: "Update At", flex: 1 }
];

export const columnOrder : GridColDef[] = [
    { field: 'id' },
    { field: 'orderCode', headerName: "Order Code", flex: 0.5 },
    { field: 'tax', headerName: "Mã Số Thuế", flex: 1 },
    { field: 'cusName', headerName: "Tên Công ty (khách hàng)", flex: 1 },
    { field: 'totalAmount', headerName: "Total Amount", flex: 1 },
    { field: 'isPayment', headerName: "Thanh Toán", flex: 1 },
    { field: 'createAt', headerName: "Create At", flex: 1.5 },
    { field: 'updateAt', headerName: "Update At", flex: 1 }
]

