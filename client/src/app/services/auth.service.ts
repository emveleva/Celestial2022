import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  authUrl = 'https://localhost:5001/api/Auth/';
  user: User;
  auth!: string;
  token!: string | null;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      return !this.jwtHelper.isTokenExpired(this.token)
    } else {
      return false;
    }
  }

  login(user: User) {
    return this.http.post(`${this.authUrl}login`, user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          console.log(user)
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(user: User) {
    return this.http.post(`${this.authUrl}register`, user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          console.log(user)
         this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    user.id = Number(this.getDecodedToken(user.token).nameid);
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigate(['/']);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
