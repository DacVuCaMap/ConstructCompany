import { GridColDef } from "@mui/x-data-grid";

export const columnCus : GridColDef[] = [
    {
        field:'id',
        flex:1
    },
    {
        field:'cusId',
        headerName:"ID",
        flex:1
    }
    ,
    {
        field:'taxCode',
        headerName:"Tax Code",
        flex:1
    }
    ,
    {
        field:'companyName',
        headerName:"Company Name",
        flex:1
    },
    {
        field:'address',
        headerName:"Address",
        flex:1
    },
    {
        field:'create_At',
        headerName:"Create At",
        flex:1
    }

]
export const columnProduct: GridColDef[] = [
    { field: 'id', flex: 1 },
    { field: 'proName', headerName: "Name", flex: 1 },
    { field: 'unit', headerName: "Unit", flex: 1 },
    { field: 'inventory', headerName: "Inventory", flex: 1 },
    { field: 'price', headerName: "Price", flex: 1 },
    { field: 'create_At', headerName: "Create At", flex: 1 },
    { field: 'update_At', headerName: "Update At", flex: 1 }
  ];