
import { GridColDef } from "@mui/x-data-grid";
import { promises as fs } from 'fs';
import sellerJson from './sellerData.json';
export const sideBarAdmin = [
    {
        id: 1,
        title: "Chức Năng Chính",
        listItems: [
            {
                id: 10,
                title: "HOME",
                url: "/",
            },
            {
                id: 12,
                title: "Quản Lí Công nợ",
                url: "/quanlicongno/list?size=10&page=0",
            }

        ],
    },
    {
        id: 2,
        title: "Quản Lí",
        listItems: [
            {
                id: 11,
                title: "BBNT và XNKL",
                url: "/invoice/list?size=10&page=0",
            },
            {
                id: 13,
                title: "BBNT và GT",
                url: "/statistic/list?size=10&page=0"
            },
            {
                id: 21,
                title: "Sản Phẩm",
                url: "/product/list?size=10&page=0",
            },
            {
                id: 22,
                title: "Khách Hàng",
                url: "/customer/list?size=10&page=0",
            },
            {
                id: 24,
                title: "Admin",
                url: "/admin/list?page=0&size=10",
            },
        ],
    },
    {
        id: 3,
        title: "More",
        listItems: [

            {
                id: 31,
                title: "Config",
                url: "/get-config",
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
        create_At: 12 - 1 - 20,
        update_At: 12 - 1 - 20
    }
]

export let sellerData :any= sellerJson;
export const setSeller=(data:any)=>{
    sellerData = data;
}

export const toltalPageGlobal = {
    value: 0,
}
