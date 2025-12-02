import { Component, OnInit } from '@angular/core';
import { ExpressMongoService } from '../express-mongo.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  // form fields
  uId: any;
  uname: any;
  email: any;
  password: any;
  role: any = 'user';

  // output
  outMsg: any;
  outRec: any = [];

  constructor(private mongo: ExpressMongoService) { }

  ngOnInit() {
    this.retrieveAll();
  }

  // CREATE
  insertUser() {
    const params = {
      uname: this.uname,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.mongo.insertUser(params).subscribe({
      next: (data: any) => {
        this.outMsg = data.message || 'User added';
        this.clearForm();
        this.retrieveAll();
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      }
    });
  }

  // READ (all)
  retrieveAll() {
    const params = {}; // empty → all users

    this.mongo.retrieveUsers(params).subscribe({
      next: (data: any) => {
        this.outRec = data;
        this.outMsg = this.outRec.length + ' user(s) retrieved';
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      }
    });
  }

  // fill form for editing
  editUser(u: any) {
    this.uId = u._id;
    this.uname = u.uname;
    this.email = u.email;
    this.password = ''; // don’t show old password
    this.role = u.role;
    this.outMsg = 'Editing user: ' + this.uname;
  }

  // UPDATE
  updateUser() {
    if (!this.uId) {
      this.outMsg = 'Select a user to edit first.';
      return;
    }

    const params = {
      _id: this.uId,
      uname: this.uname,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.mongo.updateUser(params).subscribe({
      next: (data: any) => {
        this.outMsg = data.message || 'User updated';
        this.clearForm();
        this.retrieveAll();
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      }
    });
  }

  // DELETE
  deleteUser(id: any) {
    const params = { _id: id };

    this.mongo.deleteUser(params).subscribe({
      next: (data: any) => {
        this.outMsg = data.message || 'User deleted';
        this.retrieveAll();
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      }
    });
  }

  clearForm() {
    this.uId = null;
    this.uname = '';
    this.email = '';
    this.password = '';
    this.role = 'user';
  }
}
