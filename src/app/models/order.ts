import { Shipping } from "./shipping";
import { ShoppingCartItem } from "./Shopping-cart-item";

export interface Order {
    datePlaced: number;
    items: ShoppingCartItem[];
    shipping: Shipping;
    userId: string;
}