import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Shipping } from '../models/shipping';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: Shipping = {name: "", addressLine1: "", addressLine2: "", city: ""}
  cart: ShoppingCart;
  sub: Subscription;
  userSub: Subscription;
  userId: string;
  constructor (
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.userSub.unsubscribe();
  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.sub = cart$.subscribe(cart => this.cart = cart);
    this.userSub = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.myItems.map(i=>{
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          }, 
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }  
}
