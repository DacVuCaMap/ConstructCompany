export const AddProductField = [
    {
        id: 1,
        field: "proName",
        title: "Tên Sản Phẩm",
        type: "text",
        width:"1/2"
    },
    {
        id: 2,
        field: "unit",
        title: "Đơn vị",
        type: "text",
        width:"1/4"
    },
    {
        id: 3,
        field: "inventory",
        title: "Số lượng(trong kho)",
        type: "number",
        width:"1/4"
    },
    {
        id: 4,
        field: "price",
        title: "Giá Bán",
        type: "number",
        width:"1/2"
    },
    {
        id: 5,
        field: "importPrice",
        title: "Giá Nhập",
        type: "number",
        width:"1/2"
    },
    {
        id: 6,
        field: "description",
        title: "Ghi chú",
        type: "text",
        width:"1/2"
    },
]
export const AddCustomerField = [
    { id: 1, field: "companyName", title: "Tên Công Ty", type: "text",width:'3/4' },
    { id: 7, field: "email", title: "Email", type: "text",width:'3/4' },
    { id: 5, field: "positionCustomer", title: "Người đại diện(hiện tại)", type: "text",width:'1/4' },
    { id: 6, field: "representativeCustomer", title: "Chức vụ(hiện tại)", type: "text",width:'1/4' },
    { id: 2, field: "address", title: "Địa chỉ", type: "text",width:'1/2' },
    { id: 3, field: "taxCode", title: "Mã số Thuế", type: "text",width:'1/4' },
    { id: 4, field: "phoneNumber", title: "Số điện thoại", type: "text",width:'1/4' },
]

export const AddAccount = [
    { id: 1, field: "email", title: "Tên đăng nhập", type: "text" },
    { id: 7, field: "password", title: "Mật khẩu", type: "text" },
    { id: 5, field: "fullName", title: "Họ tên", type: "text" },
    { id: 6, field: "phoneNumber", title: "Số điện thoại", type: "text" },
]
export const typeCustomerData = ["id", "companyName", "address", "taxCode", "debt", "createAt", "updateAt"]
//       companyName: item.companyName,
//       address: item.address,
//       taxCode: item.taxCode,
//       debt: item.debt,
//       createAt: item.createAt,
//       updateAt: item.updateAt
export const EditProductField = [
    { id: 1, field: "id", title: "Id", type: "disable", width:'1/6' },
    { id: 2, field: "proName", title: "Tên Vật liệu", type: "text", width:'3/4' },
    { id: 3, field: "unit", title: "Đơn vị", type: "text", width:'1/6' },
    { id: 4, field: "inventory", title: "Số lượng(trong kho)", type: "text", width:'1/4' },
    { id: 5, field: "price", title: "giá bán", type: "text", width:'1/2' },
    { id: 6, field: "importPrice", title: "giá nhập", type: "text", width:'1/2' },
    { id: 7, field: "createAt", title: "create At", type: "disable", width:'1/4' },
    { id: 8, field: "updateAt", title: "update At", type: "disable", width:'1/4' },
]
export const EditCustomerField = [
    { id: 1, field: "id", title: "ID", type: "disable",width:'1/6' },
    { id: 2, field: "companyName", title: "Tên Công Ty", type: "text", width:'3/4' },
    { id: 5, field: "email", title: "Email", type: "text", width:'3/4' },
    { id: 15, field: "representativeCustomer", title: "Người đại diện(hiện tại)", type: "text", width:'1/4' },
    { id: 6, field: "positionCustomer", title: "Chức vụ(hiện tại)", type: "text", width:'1/4' },
    { id: 7, field: "phoneNumber", title: "Số điện thoại", type: "text", width:'1/4' },
    { id: 3, field: "address", title: "Địa chỉ", type: "text", width:'3/4' },
    { id: 4, field: "taxCode", title: "Mã số Thuế", type: "text", width:'1/4' },
    { id: 8, field: "debt", title: "Công nợ", type: "disable", width:'3/4' },
    { id: 9, field: "totalPayment", title: "Tổng tiền giao dịch", type: "disable", width:'3/4' },
    { id: 10, field: "createAt", title: "Create At", type: "disable", width:'1/4' },
    { id: 11, field: "updateAt", title: "Update At", type: "disable", width:'1/4' },
]
