import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-liked-articles-list',
  templateUrl: './liked-articles-list.component.html',
  styleUrls: ['./liked-articles-list.component.scss'],
})
export class LikedArticlesListComponent implements OnInit, AfterViewInit {
  articles!: Article[];
  displayedColumns: string[] = ['title', 'createdOn', 'action'];
  user!: User;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource<Article>();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogRef: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.articles);

  }

  loadArticles() {
    console.log(this.user)
    this.userService.getLikedArticles$(this.user.id).subscribe({
      next: (res) => {
        this.articles = res;
        console.log(res)
        this.dataSource.data = this.articles;
      },
    });
  }
  ngOnInit() {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadArticles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onView(id: number) {
    console.log(id)
    this.router.navigate([`articles/${id}`])
  }

  onRemove(articleId: number) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '30%',
      data: {
        title: 'Are you sure you want to remove this article?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.userService.removeFromLiked(this.user.id, articleId).subscribe({
          next: () => {
            this.notificationService.success('Article removed.');
            this.router.navigate([`profile/liked/${this.user.id}`])
          },
        });
      }
    });
  }
}
