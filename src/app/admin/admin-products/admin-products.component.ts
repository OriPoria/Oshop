import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from '../product-form/product-form.component';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {id: string, data: Product}[] = [];
  filteredProducts: any[] = [];
  sub: Subscription;

  constructor(private productService: ProductService) {
    this.sub = this.productService.getAll()
      .snapshotChanges().subscribe(data => {
      data.map(e => {
        let data = e.payload.val();
        let id = e.key;
        this.products.push({'id': id, 'data': data as Product});
        this.filteredProducts.push({'id': id, 'data': data});
      })
    })
   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.data.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.products;

  }


}
