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
    { field: 'id' },
    { field: 'orderCode', headerName: "Order Code", flex: 0.5 },
    { field: 'tax', headerName: "Mã Số Thuế", flex: 1 },
    { field: 'cusName', headerName: "Tên Công ty (khách hàng)", flex: 1 },
    { field: 'totalAmount', headerName: "Total Amount", flex: 1 },
    { field: 'isPayment', headerName: "Thanh Toán", flex: 1 },
    { field: 'createAt', headerName: "Create At", flex: 1.5 },
    { field: 'updateAt', headerName: "Update At", flex: 1 }
]

const formatDateData = (dateString: string) => {
    if (!dateString) {
        return;
    }
    const parts = dateString.substring(0, 10).split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
}

