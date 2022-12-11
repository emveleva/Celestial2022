import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})

export class EditorService {
      editorUrl = 'https://localhost:5001/api/editor/';
      httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      constructor(private http: HttpClient) {}

      getUserArticles$(id: string): Observable<Article[]> {
            return this.http.get<Article[]>(`${this.editorUrl}${id}`);
      }

      addArticle(article: Article) {
            return this.http.post(`${this.editorUrl}`, article, this.httpOptions)
      }

      editArticle(article: Article) {
            return this.http.put(`${this.editorUrl}edit/${article.id}`, article, this.httpOptions);
      }

      deleteArticle(id: string): Observable<Article[]> {
            return this.http.delete<Article[]>(`${this.editorUrl}${id}`);
      }

      getOneArticle(id: string):  Observable<Article>{
            return this.http.get<Article>(`${this.editorUrl}articles/${id}`)
      }

      // getArticlesByUser
}