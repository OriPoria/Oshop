import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../admin/product-form/product-form.component';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input ('product') product : Product;
  @Input ('show-actions') showActions = true;
  @Input ('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
