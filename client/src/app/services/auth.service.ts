import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { LoginComponent } from '../auth/login/login.component';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  user: User[] = [];
  userId!: string;
  authUrl = 'https://localhost:5001/api/Auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'origin-list'}),
  };
  auth!: string;
  token!: string | null;
  constructor(private http: HttpClient, private router: Router) {}

  getUserData(): any {
    const token: any = localStorage.getItem('token');
    const userInfo = this.jwtHelper.decodeToken(token);
    console.log(userInfo)
    return userInfo;
  }

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      return !this.jwtHelper.isTokenExpired(this.token)
    } else {
      return false;
    }
  }

  register(user: User) {
   return  this.http
      .post(`${this.authUrl}register`, user, this.httpOptions)
  }

  login(user: User) {
    return this.http
      .post(`${this.authUrl}login`, user, this.httpOptions)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
