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

      addArticle(article: Article) {
            return this.http.post(`${this.articlesUrl}`, article, this.httpOptions)
      }

      editArticle(article: Article) {
            return this.http.put(`${this.articlesUrl}${article.id}`, article, this.httpOptions);
      }

      deleteArticle(id: string): Observable<Article[]> {
            return this.http.delete<Article[]>(`${this.articlesUrl}${id}`);
      }

      getOneArticle(id: string):  Observable<Article>{
            return this.http.get<Article>(`${this.articlesUrl}${id}`)
      }

      // getArticlesByUser
}