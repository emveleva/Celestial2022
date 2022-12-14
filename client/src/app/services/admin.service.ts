import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://localhost:5001/api/admin/';

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'users-with-roles');
  }

  getUserRoles(username: string) {
    return this.http.get<string[]>(this.baseUrl + 'users-with-roles/' + username);
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'edit-roles/' + username + '?roles=' + roles, {});
  }
}