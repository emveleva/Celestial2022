import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  user: User;
  articleId: number;
  article: Article;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private articleService: ArticlesService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.articleId = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.articleService.getOneArticle(this.articleId).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.article = res;
      }
    })
  }

  onBack() {
    this.router.navigate([`liked/${this.user.id}`])
  }
}