import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../admin/product-form/product-form.component';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category: string;
  isDataUploaded = false
  cart: any;
  sub: Subscription;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService) { 
    productService.getAll().valueChanges().pipe(switchMap((products: Product[]) => {
      this.products = products;
      productService.getAll().snapshotChanges().subscribe(productsData=> {
        let i = 0
        for (let p of this.products) {
          this.products[i].$key = productsData[i].key;
          i+=1;
        }
      })
      return route.queryParamMap;
    }))
    
    .subscribe(params => {
        this.isDataUploaded = true;
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? 
          this.products.filter(p=> p.category === this.category.toLowerCase()) : 
          this.products;
    });
    this.categories$ = categoryService.getAll();


  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  async ngOnInit() {
    this.sub = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
    
  }
  t(s) {
    console.log(s);
  }
}
