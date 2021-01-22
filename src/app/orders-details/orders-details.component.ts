import { Component, Input, OnInit } from '@angular/core';
import { MyOrderValue } from '../models/my-order-value';
import { Order } from '../models/order';

@Component({
  selector: 'orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit{
  @Input ('orders-list') ordersList: Order[];
  myOrderList : MyOrderValue [] = [];

  ngOnInit() {
    this.ordersList.map((e:Order) => {
      this.myOrderList.push(new MyOrderValue(e.shipping.name, new Date(e.datePlaced)));
    });
  }
   t() {
     console.log(this.ordersList);
   }
}
