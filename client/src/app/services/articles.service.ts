import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
      articlesUrl = 'https://localhost:5001/api/articles/';
      httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      constructor(private http: HttpClient) {}

      getArticles$(): Observable<Article[]> {
            return this.http.get<Article[]>(`${this.articlesUrl}`);
      }

      getOneArticle(id: number):  Observable<Article>{
            return this.http.get<Article>(`${this.articlesUrl}${id}`)
      }
}