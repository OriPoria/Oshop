import { Product } from "../admin/product-form/product-form.component";

export class ShoppingCartItem {

    constructor(public product: Product, public quantity: number ) { 
    }

    get totalPrice() {
        return Number(this.product.price) * this.quantity;
    }
}