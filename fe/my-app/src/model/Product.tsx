class Product {
    id:string;
    name:string;
    unit:string;
    inventory:number;
    price:number;
    description:string;
    create_At:Date;
    update_At:Date;
    constructor(id:string, name:string, unit:string, inventory:number, price:number, description:string, createdAt:Date, updatedAt:Date) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.inventory = inventory;
        this.price = price;
        this.description = description;
        this.create_At = createdAt;
        this.update_At = updatedAt;
      }
}
export default Product;