import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditorService } from 'src/app/services/editor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-articles-list',
  templateUrl: './my-articles-list.component.html',
  styleUrls: ['./my-articles-list.component.scss'],
})
export class MyArticlesListComponent implements OnInit, AfterViewInit {
  articles!: Article[];
  displayedColumns: string[] = ['title', 'body', 'createdOn', 'action'];
  userData!: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource<Article>();

  constructor(
    private editorService: EditorService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogRef: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.articles);
  }

  loadArticles() {
    this.userData = this.authService.getUserData();
    this.editorService.getUserArticles$(this.userData.nameid).subscribe({
      next: (res) => {
        this.articles = res;
        this.dataSource.data = this.articles;
      },
    });
  }
  ngOnInit() {
    this.loadArticles();
  }
  
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
    }

    onView(id: number){
      console.log(id)
      this.router.navigate([`editor/${id}`])
    }

    onEdit(id: number){
      this.router.navigate([`editor/edit/${id}`])
    }

    onDelete(id: string) {
      const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
        width: '30%',
        data: {
          title: 'Are you sure you want to delete this article?',
        },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {       
                this.editorService.deleteArticle(id).subscribe({
                  next: () => {
                    this.notificationService.success('Article deleted.');
                    this.router.navigate(['editor'])
                  },
                });
        }
      });
    }
  }
