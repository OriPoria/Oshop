import { Product } from "../admin/product-form/product-form.component";
import { ShoppingCartItem } from "./Shopping-cart-item";

export class ShoppingCart  {
    myItems: ShoppingCartItem[] = [];
        
    constructor(public items: ShoppingCartItem[]) {
        for (let item in items) {
            this.myItems.push(new ShoppingCartItem(items[item].product, items[item].quantity ));
        }
     }

    get ProductIds() {
        return Object.keys(this.items);
    }
    get totalItemsCount() : number {
        let count = 0;
        for (let prodId in this.items) {
            count += this.items[prodId].quantity;
        }
        return count;
    }

    get totalPrice(){
        let sum = 0;
        for (let item of this.myItems) {
            sum += item.totalPrice;
        }
        return sum;
    }
    
  getQuantity(product: Product) {
    let item = this.items[product.$key];
    return item ? item.quantity : 0;
  }


}