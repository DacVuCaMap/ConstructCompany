class Product {
    id:string;
    name:string;
    unit:string;
    inventory:number;
    price:number;
    description:string;
    createAt:Date;
    updateAt:Date;
    constructor(id:string, name:string, unit:string, inventory:number, price:number, description:string, createdAt:Date, updatedAt:Date) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.inventory = inventory;
        this.price = price;
        this.description = description;
        this.createAt = createdAt;
        this.updateAt = updatedAt;
      }
}
export default Product;