import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$

  constructor(private orderService: OrderService) { 
  }

  async ngOnInit() {
    this.orders$ = await (this.orderService.getOrders().valueChanges() as Observable<Order[]>)

  }

}
