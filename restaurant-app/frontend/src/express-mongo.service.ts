import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressMongoService {

  private baseUrl = 'http://127.0.0.1:8887';

  constructor(private http: HttpClient) { }

  // ----- USERS CRUD -----

  insertUser(params: any) {
    return this.http.post(this.baseUrl + '/insertUser', { params });
  }

  retrieveUsers(params: any) {
    return this.http.get(this.baseUrl + '/retrieveUsers', { params });
  }

  updateUser(params: any) {
    return this.http.put(this.baseUrl + '/updateUser', { params });
  }

  deleteUser(params: any) {
    return this.http.delete(this.baseUrl + '/deleteUser', { params });
  }
}
