export const AddProductField = [
    {
        id: 1,
        field: "proName",
        title: "Tên Sản Phẩm",
        type: "text",
    },
    {
        id: 2,
        field: "Đơn vị",
        title: "Unit",
        type: "text",
    },
    {
        id: 3,
        field: "inventory",
        title: "Số lượng(trong kho)",
        type: "number",
    },
    {
        id: 4,
        field: "price",
        title: "Giá Bán",
        type: "number",
    },
    {
        id: 5,
        field: "importPrice",
        title: "Giá Nhập",
        type: "number",
    },
    {
        id: 6,
        field: "description",
        title: "Ghi chú",
        type: "text",
    },
]
export const AddCustomerField = [
    { id: 1, field: "companyName", title: "Tên Công Ty", type: "text" },
    { id: 2, field: "address", title: "Địa chỉ", type: "text" },
    { id: 3, field: "taxCode", title: "Mã số Thuế", type: "text" },
    { id: 4, field: "phoneNumber", title: "Số điện thoại", type: "text" },
    { id: 5, field: "positionCustomer", title: "Người đại diện(hiện tại)", type: "text" },
    { id: 6, field: "representativeCustomer", title: "Chức vụ(hiện tại)", type: "text" }
]

export const typeCustomerData = ["id", "companyName", "address", "taxCode", "debt", "createAt", "updateAt"]
//       companyName: item.companyName,
//       address: item.address,
//       taxCode: item.taxCode,
//       debt: item.debt,
//       createAt: item.createAt,
//       updateAt: item.updateAt
export const EditProductField = [
    { id: 1, field: "id", title: "Id", type: "disable" },
    { id: 2, field: "proName", title: "Tên Vật liệu", type: "text" },
    { id: 3, field: "unit", title: "Đơn vị", type: "text" },
    { id: 4, field: "inventory", title: "Số lượng(trong kho)", type: "text" },
    { id: 5, field: "price", title: "giá bán", type: "number" },
    { id: 6, field: "importPrice", title: "giá nhập", type: "number" },
    { id: 7, field: "createAt", title: "create At", type: "disable" },
    { id: 8, field: "updateAt", title: "update At", type: "disable" },
]
export const EditCustomerField = [
    { id: 1, field: "id", title: "ID", type: "text" },
    { id: 2, field: "companyName", title: "Tên Công Ty", type: "text" },
    { id: 3, field: "address", title: "Địa chỉ", type: "text" },
    { id: 4, field: "taxCode", title: "Mã số Thuế", type: "text" },
    { id: 5, field: "positionCustomer", title: "Người đại diện(hiện tại)", type: "text" },
    { id: 6, field: "representativeCustomer", title: "Chức vụ(hiện tại)", type: "text" },
    { id: 7, field: "phoneNumber", title: "Số điện thoại", type: "text" },
    { id: 8, field: "debt", title: "Công nợ", type: "disable" },
    { id: 9, field: "totalPayment", title: "Tổng tiền giao dịch", type: "disable" },
    { id: 10, field: "createAt", title: "Create At", type: "disable" },
    { id: 11, field: "updateAt", title: "Update At", type: "disable" },
]