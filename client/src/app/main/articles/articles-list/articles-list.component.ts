import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  articles!: Article[];
user: User;
likedArticles: Article[];

  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  loadArticles() {
    this.articlesService.getArticles$().subscribe({
      next: (res) => {
        this.articles = res;
      },
    });
  }

  getUserLiked() {
    console.log(this.user)
    this.userService.getLikedArticles$(this.user.id).subscribe({
      next: (res) => {
        this.likedArticles = res || [];
        console.log(res)
      },
      error: (res: HttpErrorResponse) => {
        this.likedArticles = [];
      }
    });
  }

  isLiked(articleId: number): boolean{
    if (this.likedArticles?.findIndex(x => x.appUserId == this.user.id && x.id == articleId) <= -1){
      return false
    } else {
      return true
    }
  }
  onLike(articleId: number): void{
    this.userService.addToLiked(this.user.id, articleId).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.loadArticles();
        this.getUserLiked();
        this.changeRef.detectChanges();
      }
    })
  }

  onUnlike(articleId: number): void{
    this.userService.removeFromLiked(this.user.id, articleId).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.loadArticles();
        this.getUserLiked();
        this.changeRef.detectChanges();
      }
    })
  }


  ngOnInit() {
    this.loadArticles();
    this.getUserLiked();
  }
}