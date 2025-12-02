import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  standalone: false,
})
export class OrdersPage implements OnInit {

  orders: any = [];
  newOrder = {
    customerId: "",
    items: [],
    totalPrice: 0,
    status: "Pending",
    orderDate: new Date().toISOString()
  };

  constructor(private orderService: OrdersService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => this.orders = data);
  }

  createOrder() {
    this.orderService.addOrder(this.newOrder).subscribe(() => {
      this.loadOrders();
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }
}
