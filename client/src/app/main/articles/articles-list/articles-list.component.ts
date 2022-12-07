import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  articles!: Article[];
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  loadArticles() {
    this.articlesService.getArticles$().subscribe({
      next: (res) => {
        this.articles = res;
      },
    });
  }
  ngOnInit() {
    this.loadArticles();
  }
}