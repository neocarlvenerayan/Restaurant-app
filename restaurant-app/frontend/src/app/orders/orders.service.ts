import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  apiURL = "http://localhost:3000/orders";

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(this.apiURL);
  }

  addOrder(order: any) {
    return this.http.post(this.apiURL, order);
  }

  updateOrder(id: string, order: any) {
    return this.http.put(`${this.apiURL}/${id}`, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
