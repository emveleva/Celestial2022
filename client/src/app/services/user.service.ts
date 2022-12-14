import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
      userUrl = 'https://localhost:5001/api/users/';
      httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      constructor(private http: HttpClient) {}

      getLikedArticles$(id: number): Observable<Article[]> {
            return this.http.get<Article[]>(`${this.userUrl}liked/${id}`);
      }

      addToLiked(userId: number, articleId: number) {
            return this.http.post(`${this.userUrl}${userId}/liked/${articleId}`, this.httpOptions)
      }

      editProfile(user: User) {
            return this.http.put(`${this.userUrl}profile`, user, this.httpOptions);
      }

      removeFromLiked(userId: number, articleId: number): Observable<Article[]> {
            return this.http.delete<Article[]>(`${this.userUrl}${userId}/liked/${articleId}`);
      }

      getProfile(id: number): Observable<User>{
            return this.http.get<User>(`${this.userUrl}profile/${id}`)
      }
}