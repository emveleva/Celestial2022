import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
      constructor(
            private http: HttpClient) {}

      newsUrl = 'https://spacefo.p.rapidapi.com/articles';

      httpOptions = {
            headers: new HttpHeaders({ 'X-RapidAPI-Key': 'afee7bd446msh93e3a464d7f293fp10f54cjsn911c94d6e2c9',
                                          'X-RapidAPI-Host': 'spacefo.p.rapidapi.com' }),
          };
      getNews() {
            return this.http
              .get(`${this.newsUrl}`, this.httpOptions)
          }
}
