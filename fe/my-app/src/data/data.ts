import { GridColDef } from "@mui/x-data-grid";

export const sideBarAdmin = [
    {
        id: 1,
        title: "Main",
        listItems: [
            {
                id: 11,
                title: "Home",
                url: "/",
            },
            {
                id: 12,
                title: "Quản Lý Hóa Đơn",
                url: "/invoice",
            },
        ],
    },
    {
        id: 2,
        title: "Management",
        listItems: [

            {
                id: 21,
                title: "Product",
                url: "/product/page=0",
            },
            {
                id: 22,
                title: "Customer",
                url: "/customer/get?size=10&page=0/",
            },
            {
                id: 23,
                title: "Product Order",
                url: "/posts",
            },
            {
                id: 24,
                title: "Admin",
                url: "/admin",
            },
        ],
    },
    {
        id: 3,
        title: "More",
        listItems: [

            {
                id: 31,
                title: "Logs",
                url: "/faculties",
            },
        ],
    },
];




export const inputOrderProduct = [
    {
        id: "1",
        title: "Represenative Customer",
        dataName: "represenativeCustomer",
        type: "text"
    },
    {
        id: "2",
        title: "Represenative Seller",
        dataName: "represenativeCustomer",
        type: "text"
    },
]
export const testData = [
    {
        id: 1,
        name: "BASE A",
        unit: "m3",
        inventory: 23.2,
        price: 12.1,
        description: "oke con de",
        create_At: 12-1-20,
        update_At: 12-1-20
    }
]

export const sellerData = {
    id:1
    ,companyName:"CÔNG TY TNHH XÂY DỰNG VÀ THƯƠNG MẠI TIẾN ĐÔNG",
    address:"Thôn Thuận An 1, xã Hữu Văn, Huyện Chương Mỹ, TP Hà Nội",
    taxCode:"0110128690"
}