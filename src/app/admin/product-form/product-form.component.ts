import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

export type Product = {
  $key:string, title: string, price: string, category: string, imageUrl: string 
}
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$;
  product: Product = {
    $key:"", title: "", price: "", category: "", imageUrl: ""
  };
  productCategory: string;
  id;
  test:number = 3;
  sub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.sub = this.productService.get(this.id).valueChanges().subscribe((p: Product) => 
        { this.product = p;
          this.productCategory = this.product.category.trim().toUpperCase();
          
      });
    } 
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {

  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.product = {
      $key:"", title: "", price: "", category: "", imageUrl: ""
    };
    this.sub.unsubscribe();
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
