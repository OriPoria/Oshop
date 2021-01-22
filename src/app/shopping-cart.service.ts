import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { Product } from './admin/product-form/product-form.component';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/Shopping-cart-item';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

type shoppingCart = {
  quantity: number,
  product: Product
}
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  dic: any = {};
   constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(map((x:ShoppingCart)=>{
      let list: ShoppingCartItem[] = [];
      if (x != null) {
        list = x.items;
      }
      return new ShoppingCart(list);
      }));
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
    
  }
  async addToCart (newProduct: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$  = this.db.object('/shopping-cart/' + cartId + '/items/' + newProduct.$key);
    item$.snapshotChanges().pipe(take(1),).subscribe(item=> {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val()['quantity']+1})
        

      } else {
          let productToEnter = {'title': newProduct.title,
          'price': newProduct.price,
          'category': newProduct.category,
          'imageUrl': newProduct.imageUrl
        }
        item$.set({product: productToEnter, quantity: 1});
      }
    })

  }
  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$  = this.db.object('/shopping-cart/' + cartId + '/items/' + product.$key);
    item$.snapshotChanges().pipe(take(1),).subscribe(item=> {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val()['quantity']-1});
        let quantity = item.payload.val()['quantity']-1;
        if (quantity == 0) {
          item$.remove();
        }


      } 

    })
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }
}
